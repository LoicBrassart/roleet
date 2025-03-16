import { dataSource } from '../config/db';
import CustomContext from '../types/CustomContext';
import { MiddlewareFn } from 'type-graphql';
import { Roles } from '../entities/User';

/**
 * Middleware pour vérifier que l'utilisateur est propriétaire de la ressource ou ADMIN.
 * Toutes les entités doivent avoir un champ 'id' et une relation 'owner'.
 */
export function IsOwner<
  Entity extends { id: string | number; owner: { id: string | number } }
>(entityClass: { new (): Entity }): MiddlewareFn<CustomContext> {
  return async ({ context, args }, next) => {
    const user = context.user;

    if (!user) {
      throw new Error(`You must be authenticated to access this resource.`);
    }

    const entityId = args.id as string | number;
    if (!entityId) {
      throw new Error(
        `Argument 'id' is required for ${entityClass.name} access control.`
      );
    }

    const repository = dataSource.getRepository(entityClass);
    const entity = await repository
      .createQueryBuilder('entity')
      .leftJoinAndSelect('entity.owner', 'owner')
      .where('entity.id = :id', { id: entityId })
      .getOne();

    if (!entity) {
      throw new Error(`${entityClass.name} not found.`);
    }

    if (entity.owner.id !== user.id && !user.roles.includes(Roles.ADMIN)) {
      throw new Error(
        `You are not authorized to access this ${entityClass.name}.`
      );
    }

    // Injection typée de la ressource pour réutilisation
    context.resource = entity as Entity;

    return next();
  };
}
