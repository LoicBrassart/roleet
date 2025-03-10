import UserResolver from "../UserResolver";
import { User } from "../../entities/User";
import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";

jest.mock("../../entities/User");
jest.mock("argon2");
jest.mock("jsonwebtoken");

describe("UserResolver", () => {
  let resolver: UserResolver;

  beforeEach(() => {
    resolver = new UserResolver();
    jest.clearAllMocks();
  });

  describe("login", () => {
    it("should return a user token and public profile on successful login", async () => {
      const userInput = { mail: "test@mail.com", password: "password" };
      const userMock = {
        id: 1,
        mail: "test@mail.com",
        hashedPassword: "hashedPassword",
        name: "Test User",
        roles: ["USER"],
        readScenarios: [],
      };
      const tokenMock = "jwt_token_mock";
      (User.findOne as jest.Mock).mockResolvedValue(userMock);
      (argon2.verify as jest.Mock).mockResolvedValue(true);
      (jwt.sign as jest.Mock).mockReturnValue(tokenMock);

      const contextMock = { res: { setHeader: jest.fn() } };

      const result = await resolver.login(userInput, contextMock as any);

      expect(User.findOne).toHaveBeenCalledWith({
        where: { mail: userInput.mail },
        relations: ["readScenarios"],
      });
      expect(argon2.verify).toHaveBeenCalledWith(
        userMock.hashedPassword,
        userInput.password
      );
      expect(jwt.sign).toHaveBeenCalledWith(
        {
          id: userMock.id,
          mail: userMock.mail,
          name: userMock.name,
          roles: userMock.roles,
        },
        process.env.JWT_SECRET
      );
      expect(contextMock.res.setHeader).toHaveBeenCalledWith(
        "Set-Cookie",
        expect.stringContaining("roleetAuthToken")
      );
      expect(result).toBe(
        JSON.stringify({
          id: userMock.id,
          name: userMock.name,
          roles: userMock.roles,
          readScenarios: [],
        })
      );
    });

    it("should throw an error if the user is not found", async () => {
      const userInput = { mail: "invalid@mail.com", password: "password" };
      (User.findOne as jest.Mock).mockResolvedValue(null);

      const contextMock = { res: { setHeader: jest.fn() } };

      const result = await resolver.login(userInput, contextMock as any);

      expect(result).toBeInstanceOf(Error);
    });

    it("should throw an error if the password is invalid", async () => {
      const userInput = { mail: "test@mail.com", password: "wrongpassword" };
      const userMock = {
        hashedPassword: "hashedPassword",
      };
      (User.findOne as jest.Mock).mockResolvedValue(userMock);
      (argon2.verify as jest.Mock).mockResolvedValue(false);

      const contextMock = { res: { setHeader: jest.fn() } };

      const result = await resolver.login(userInput, contextMock as any);

      expect(result).toBeInstanceOf(Error);
    });
  });

  describe("signup", () => {
    it("should create a new user and return a user token and public profile", async () => {
      const userInput = {
        mail: "newuser@mail.com",
        password: "password",
        name: "New User",
      };
      const hashedPassword = "hashedPassword";
      const userMock = {
        id: 1,
        mail: "newuser@mail.com",
        name: "New User",
        roles: ["USER"],
        readScenarios: [],
      };
      const tokenMock = "jwt_token_mock";
      (argon2.hash as jest.Mock).mockResolvedValue(hashedPassword);
      (User.save as jest.Mock).mockResolvedValue(userMock);
      (jwt.sign as jest.Mock).mockReturnValue(tokenMock);

      const contextMock = { res: { setHeader: jest.fn() } };

      const result = await resolver.signup(userInput, contextMock as any);

      expect(argon2.hash).toHaveBeenCalledWith(userInput.password);
      expect(User.save).toHaveBeenCalledWith({
        mail: userInput.mail,
        name: userInput.name,
        hashedPassword,
        roles: ["USER"],
      });
      expect(jwt.sign).toHaveBeenCalledWith(
        {
          id: userMock.id,
          mail: userMock.mail,
          name: userMock.name,
          roles: userMock.roles,
        },
        process.env.JWT_SECRET
      );
      expect(contextMock.res.setHeader).toHaveBeenCalledWith(
        "Set-Cookie",
        expect.stringContaining("roleetAuthToken")
      );
      expect(result).toBe(
        JSON.stringify({
          id: userMock.id,
          name: userMock.name,
          roles: userMock.roles,
          readScenarios: [],
        })
      );
    });

    it("should throw an error if the user creation fails", async () => {
      const userInput = {
        mail: "newuser@mail.com",
        password: "password",
        name: "New User",
      };
      (argon2.hash as jest.Mock).mockRejectedValue(new Error("Hashing failed"));

      const contextMock = { res: { setHeader: jest.fn() } };

      const result = await resolver.signup(userInput, contextMock as any);

      expect(result).toBeInstanceOf(Error);
    });
  });

  describe("logout", () => {
    it("should clear the authentication cookie", async () => {
      const contextMock = { res: { setHeader: jest.fn() } };

      const result = await resolver.logout(contextMock as any);

      expect(contextMock.res.setHeader).toHaveBeenCalledWith(
        "Set-Cookie",
        "roleetAuthToken=;secure;httpOnly;SameSite=Strict;expires=Thu, 01 Jan 1970 00:00:00 GMT"
      );
      expect(result).toBe("Goodbye, your auth cookie was cleared");
    });
  });
});
