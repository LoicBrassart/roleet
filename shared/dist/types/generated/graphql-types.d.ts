import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends {
    [key: string]: unknown;
}> = {
    [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<T extends {
    [key: string]: unknown;
}, K extends keyof T> = {
    [_ in K]?: never;
};
export type Incremental<T> = T | {
    [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: {
        input: string;
        output: string;
    };
    String: {
        input: string;
        output: string;
    };
    Boolean: {
        input: boolean;
        output: boolean;
    };
    Int: {
        input: number;
        output: number;
    };
    Float: {
        input: number;
        output: number;
    };
    DateTimeISO: {
        input: any;
        output: any;
    };
    JSON: {
        input: any;
        output: any;
    };
    JSONObject: {
        input: any;
        output: any;
    };
};
export type Campaign = {
    __typename?: 'Campaign';
    bannerUrl: Scalars['String']['output'];
    id: Scalars['ID']['output'];
    messages: Array<Message>;
    notes: Array<Note>;
    owner: User;
    players: Array<User>;
    scenarios: Array<Scenario>;
    sessions: Array<Session>;
    storyteller: User;
    title: Scalars['String']['output'];
};
export type Flashcard = {
    __typename?: 'Flashcard';
    data: Scalars['JSONObject']['output'];
    description: Scalars['String']['output'];
    id: Scalars['ID']['output'];
    owner: User;
    scenario: Scenario;
    title: Scalars['String']['output'];
    type: Scalars['String']['output'];
};
export type Message = {
    __typename?: 'Message';
    campaign: Campaign;
    content: Scalars['String']['output'];
    createdAt: Scalars['DateTimeISO']['output'];
    id: Scalars['ID']['output'];
    owner: User;
};
export type Mutation = {
    __typename?: 'Mutation';
    createCampaign: Campaign;
    createFlashcard: Flashcard;
    createMessage: Message;
    createPlan: Plan;
    createPointOfInterest: PointOfInterest;
    createScenario: Scenario;
    createSession: Session;
    deleteFlashcard: Scalars['Boolean']['output'];
    deletePlan: Scalars['Boolean']['output'];
    deletePointOfInterest: Scalars['Boolean']['output'];
    deleteScenario: Scalars['Boolean']['output'];
    deleteSession: Scalars['Boolean']['output'];
    editNotes: Note;
    editSession: Session;
    login: Scalars['JSONObject']['output'];
    logout: Scalars['String']['output'];
    signup: Scalars['String']['output'];
    unsealScenario: Scalars['Boolean']['output'];
    updatePlan: Plan;
    updatePointOfInterest: PointOfInterest;
    updateScenario: Scenario;
};
export type MutationCreateCampaignArgs = {
    data: NewCampaignInput;
};
export type MutationCreateFlashcardArgs = {
    data: NewFlashcardInput;
};
export type MutationCreateMessageArgs = {
    data: NewMessageInput;
};
export type MutationCreatePlanArgs = {
    data: NewPlanInput;
};
export type MutationCreatePointOfInterestArgs = {
    data: NewPointOfInterestInput;
};
export type MutationCreateScenarioArgs = {
    data: NewScenarioInput;
};
export type MutationCreateSessionArgs = {
    campaignId: Scalars['String']['input'];
    data: NewSessionInput;
};
export type MutationDeleteFlashcardArgs = {
    id: Scalars['String']['input'];
};
export type MutationDeletePlanArgs = {
    id: Scalars['String']['input'];
};
export type MutationDeletePointOfInterestArgs = {
    id: Scalars['String']['input'];
};
export type MutationDeleteScenarioArgs = {
    id: Scalars['String']['input'];
};
export type MutationDeleteSessionArgs = {
    id: Scalars['String']['input'];
};
export type MutationEditNotesArgs = {
    content: Scalars['String']['input'];
    noteId: Scalars['String']['input'];
};
export type MutationEditSessionArgs = {
    data: SessionInput;
    sessionId: Scalars['String']['input'];
};
export type MutationLoginArgs = {
    data: UserInput;
};
export type MutationSignupArgs = {
    data: NewUserInput;
};
export type MutationUnsealScenarioArgs = {
    id: Scalars['String']['input'];
};
export type MutationUpdatePlanArgs = {
    data: PlanInput;
    id: Scalars['String']['input'];
};
export type MutationUpdatePointOfInterestArgs = {
    data: PointOfInterestInput;
    id: Scalars['String']['input'];
};
export type MutationUpdateScenarioArgs = {
    data: ScenarioInput;
    id: Scalars['String']['input'];
};
export type NewCampaignInput = {
    bannerUrl: Scalars['String']['input'];
    players: Array<Scalars['ID']['input']>;
    scenarios: Array<Scalars['ID']['input']>;
    title: Scalars['String']['input'];
};
export type NewFlashcardInput = {
    data?: InputMaybe<Scalars['JSON']['input']>;
    description: Scalars['String']['input'];
    scenarioId: Scalars['ID']['input'];
    title: Scalars['String']['input'];
    type: Scalars['String']['input'];
};
export type NewMessageInput = {
    campaignId: Scalars['String']['input'];
    content: Scalars['String']['input'];
    ownerId: Scalars['String']['input'];
};
export type NewPlanInput = {
    description: Scalars['String']['input'];
    pictureUrl: Scalars['String']['input'];
    scenarioId: Scalars['String']['input'];
    title: Scalars['String']['input'];
};
export type NewPointOfInterestInput = {
    code: Scalars['String']['input'];
    description: Scalars['String']['input'];
    planId: Scalars['String']['input'];
    title: Scalars['String']['input'];
};
export type NewScenarioInput = {
    bannerUrl?: InputMaybe<Scalars['String']['input']>;
    credits: Scalars['String']['input'];
    fullStory: Scalars['String']['input'];
    teaser: Scalars['String']['input'];
    title: Scalars['String']['input'];
};
export type NewSessionInput = {
    location: Scalars['String']['input'];
    programmedAt: Scalars['DateTimeISO']['input'];
    summary: Scalars['String']['input'];
};
export type NewUserInput = {
    mail: Scalars['String']['input'];
    name: Scalars['String']['input'];
    password: Scalars['String']['input'];
};
export type Note = {
    __typename?: 'Note';
    campaign: Campaign;
    content: Scalars['String']['output'];
    id: Scalars['ID']['output'];
    owner: User;
};
export type Plan = {
    __typename?: 'Plan';
    description: Scalars['String']['output'];
    id: Scalars['ID']['output'];
    owner: User;
    pictureUrl: Scalars['String']['output'];
    pointsOfInterest: Array<PointOfInterest>;
    scenario: Scenario;
    title: Scalars['String']['output'];
};
export type PlanInput = {
    description: Scalars['String']['input'];
    pictureUrl: Scalars['String']['input'];
    title: Scalars['String']['input'];
};
export type PointOfInterest = {
    __typename?: 'PointOfInterest';
    code: Scalars['String']['output'];
    description: Scalars['String']['output'];
    id: Scalars['ID']['output'];
    owner: User;
    plan: Plan;
    title: Scalars['String']['output'];
};
export type PointOfInterestInput = {
    code: Scalars['String']['input'];
    description: Scalars['String']['input'];
    planId: Scalars['String']['input'];
    title: Scalars['String']['input'];
};
export type Query = {
    __typename?: 'Query';
    getAllScenarios: Array<Scenario>;
    getAllUsers: Array<User>;
    getCampaign?: Maybe<Campaign>;
    getMessagesByCampaign: Array<Message>;
    getMyCampaigns: Array<Campaign>;
    getMyScenarios: Array<Scenario>;
    getNotes: Note;
    getPlan: Plan;
    getScenario: Scenario;
    getStats: Stats;
};
export type QueryGetCampaignArgs = {
    id: Scalars['String']['input'];
};
export type QueryGetMessagesByCampaignArgs = {
    id: Scalars['String']['input'];
};
export type QueryGetNotesArgs = {
    campaignId: Scalars['String']['input'];
};
export type QueryGetPlanArgs = {
    id: Scalars['String']['input'];
};
export type QueryGetScenarioArgs = {
    id: Scalars['String']['input'];
};
/** Roles for users in this app */
export declare enum Roles {
    Admin = "ADMIN",
    User = "USER"
}
export type Scenario = {
    __typename?: 'Scenario';
    bannerUrl: Scalars['String']['output'];
    campaigns: Array<Campaign>;
    credits: Scalars['String']['output'];
    flashcards: Array<Flashcard>;
    fullStory: Scalars['String']['output'];
    id: Scalars['ID']['output'];
    owner: User;
    plans: Array<Plan>;
    readers: Array<User>;
    teaser: Scalars['String']['output'];
    title: Scalars['String']['output'];
};
export type ScenarioInput = {
    bannerUrl?: InputMaybe<Scalars['String']['input']>;
    credits: Scalars['String']['input'];
    fullStory: Scalars['String']['input'];
    teaser: Scalars['String']['input'];
    title: Scalars['String']['input'];
};
export type Session = {
    __typename?: 'Session';
    campaign: Campaign;
    id: Scalars['ID']['output'];
    location: Scalars['String']['output'];
    programmedAt: Scalars['DateTimeISO']['output'];
    summary: Scalars['String']['output'];
};
export type SessionInput = {
    location: Scalars['String']['input'];
    programmedAt: Scalars['DateTimeISO']['input'];
    summary: Scalars['String']['input'];
};
export type Stats = {
    __typename?: 'Stats';
    campaigns: Scalars['Float']['output'];
    flashcards: Scalars['Float']['output'];
    plans: Scalars['Float']['output'];
    scenarios: Scalars['Float']['output'];
    users: Scalars['Float']['output'];
};
export type User = {
    __typename?: 'User';
    campaignsToLead: Array<Campaign>;
    campaignsToPlay: Array<Campaign>;
    hashedPassword: Scalars['String']['output'];
    id: Scalars['ID']['output'];
    mail: Scalars['String']['output'];
    name: Scalars['String']['output'];
    ownedCampaigns: Array<Campaign>;
    ownedFlashcards: Array<Flashcard>;
    ownedMessages: Array<Message>;
    ownedNotes: Array<Note>;
    ownedPlans: Array<Plan>;
    ownedPointsOfInterest: Array<PointOfInterest>;
    ownedScenarios: Array<Scenario>;
    readScenarios: Array<Scenario>;
    roles: Array<Roles>;
};
export type UserInput = {
    mail: Scalars['String']['input'];
    password: Scalars['String']['input'];
};
export type SignupMutationVariables = Exact<{
    data: NewUserInput;
}>;
export type SignupMutation = {
    __typename?: 'Mutation';
    signup: string;
};
export type LoginMutationVariables = Exact<{
    data: UserInput;
}>;
export type LoginMutation = {
    __typename?: 'Mutation';
    login: any;
};
export type LogoutMutationVariables = Exact<{
    [key: string]: never;
}>;
export type LogoutMutation = {
    __typename?: 'Mutation';
    logout: string;
};
export type GetMyCampaignsQueryVariables = Exact<{
    [key: string]: never;
}>;
export type GetMyCampaignsQuery = {
    __typename?: 'Query';
    getMyCampaigns: Array<{
        __typename?: 'Campaign';
        id: string;
        bannerUrl: string;
        title: string;
        storyteller: {
            __typename?: 'User';
            id: string;
            name: string;
        };
        scenarios: Array<{
            __typename?: 'Scenario';
            id: string;
            title: string;
        }>;
        players: Array<{
            __typename?: 'User';
            id: string;
            name: string;
        }>;
        sessions: Array<{
            __typename?: 'Session';
            id: string;
            location: string;
            programmedAt: any;
            summary: string;
        }>;
    }>;
};
export type GetCampaignQueryVariables = Exact<{
    id: Scalars['String']['input'];
}>;
export type GetCampaignQuery = {
    __typename?: 'Query';
    getCampaign?: {
        __typename?: 'Campaign';
        id: string;
        bannerUrl: string;
        title: string;
        storyteller: {
            __typename?: 'User';
            id: string;
            name: string;
        };
        scenarios: Array<{
            __typename?: 'Scenario';
            id: string;
            title: string;
        }>;
        players: Array<{
            __typename?: 'User';
            id: string;
            name: string;
        }>;
        messages: Array<{
            __typename?: 'Message';
            id: string;
            content: string;
            createdAt: any;
        }>;
        sessions: Array<{
            __typename?: 'Session';
            id: string;
            location: string;
            programmedAt: any;
            summary: string;
        }>;
    } | null;
};
export type CreateCampaignMutationVariables = Exact<{
    data: NewCampaignInput;
}>;
export type CreateCampaignMutation = {
    __typename?: 'Mutation';
    createCampaign: {
        __typename?: 'Campaign';
        id: string;
        bannerUrl: string;
        title: string;
    };
};
export type GetCampaignAndNotesQueryVariables = Exact<{
    campaignId: Scalars['String']['input'];
}>;
export type GetCampaignAndNotesQuery = {
    __typename?: 'Query';
    getCampaign?: {
        __typename?: 'Campaign';
        id: string;
        bannerUrl: string;
        title: string;
        storyteller: {
            __typename?: 'User';
            id: string;
            name: string;
        };
        scenarios: Array<{
            __typename?: 'Scenario';
            id: string;
            title: string;
        }>;
        players: Array<{
            __typename?: 'User';
            id: string;
            name: string;
        }>;
        sessions: Array<{
            __typename?: 'Session';
            id: string;
            location: string;
            programmedAt: any;
            summary: string;
        }>;
    } | null;
    getNotes: {
        __typename?: 'Note';
        id: string;
        content: string;
    };
    getMessagesByCampaign: Array<{
        __typename?: 'Message';
        id: string;
        content: string;
        createdAt: any;
        owner: {
            __typename?: 'User';
            id: string;
            name: string;
        };
    }>;
};
export type GetMessagesByCampaignQueryVariables = Exact<{
    campaignId: Scalars['String']['input'];
}>;
export type GetMessagesByCampaignQuery = {
    __typename?: 'Query';
    messages: Array<{
        __typename?: 'Message';
        id: string;
        content: string;
        createdAt: any;
        owner: {
            __typename?: 'User';
            id: string;
        };
        campaign: {
            __typename?: 'Campaign';
            id: string;
        };
    }>;
};
export type GetStatsQueryVariables = Exact<{
    [key: string]: never;
}>;
export type GetStatsQuery = {
    __typename?: 'Query';
    stats: {
        __typename?: 'Stats';
        campaigns: number;
        flashcards: number;
        plans: number;
        scenarios: number;
        users: number;
    };
};
export type EditNotesMutationVariables = Exact<{
    noteId: Scalars['String']['input'];
    content: Scalars['String']['input'];
}>;
export type EditNotesMutation = {
    __typename?: 'Mutation';
    editNotes: {
        __typename?: 'Note';
        id: string;
    };
};
export type CreatePlanMutationVariables = Exact<{
    data: NewPlanInput;
}>;
export type CreatePlanMutation = {
    __typename?: 'Mutation';
    createPlan: {
        __typename?: 'Plan';
        id: string;
    };
};
export type UpdatePlanMutationVariables = Exact<{
    id: Scalars['String']['input'];
    data: PlanInput;
}>;
export type UpdatePlanMutation = {
    __typename?: 'Mutation';
    updatePlan: {
        __typename?: 'Plan';
        id: string;
    };
};
export type GetPlanQueryVariables = Exact<{
    id: Scalars['String']['input'];
}>;
export type GetPlanQuery = {
    __typename?: 'Query';
    getPlan: {
        __typename?: 'Plan';
        id: string;
        title: string;
        description: string;
        pictureUrl: string;
        owner: {
            __typename?: 'User';
            id: string;
        };
        pointsOfInterest: Array<{
            __typename?: 'PointOfInterest';
            id: string;
            code: string;
            title: string;
            description: string;
        }>;
        scenario: {
            __typename?: 'Scenario';
            id: string;
            bannerUrl: string;
            credits: string;
            fullStory: string;
            teaser: string;
            title: string;
        };
    };
};
export type CreatePointOfInterestMutationVariables = Exact<{
    data: NewPointOfInterestInput;
}>;
export type CreatePointOfInterestMutation = {
    __typename?: 'Mutation';
    createPointOfInterest: {
        __typename?: 'PointOfInterest';
        id: string;
    };
};
export type UpdatePointOfInterestMutationVariables = Exact<{
    id: Scalars['String']['input'];
    data: PointOfInterestInput;
}>;
export type UpdatePointOfInterestMutation = {
    __typename?: 'Mutation';
    updatePointOfInterest: {
        __typename?: 'PointOfInterest';
        id: string;
    };
};
export type GetAllScenariosQueryVariables = Exact<{
    [key: string]: never;
}>;
export type GetAllScenariosQuery = {
    __typename?: 'Query';
    getAllScenarios: Array<{
        __typename?: 'Scenario';
        id: string;
        title: string;
        teaser: string;
        bannerUrl: string;
        credits: string;
    }>;
};
export type GetMyScenariosQueryVariables = Exact<{
    [key: string]: never;
}>;
export type GetMyScenariosQuery = {
    __typename?: 'Query';
    getMyScenarios: Array<{
        __typename?: 'Scenario';
        id: string;
        title: string;
        teaser: string;
        bannerUrl: string;
        credits: string;
    }>;
};
export type GetScenarioQueryVariables = Exact<{
    id: Scalars['String']['input'];
}>;
export type GetScenarioQuery = {
    __typename?: 'Query';
    getScenario: {
        __typename?: 'Scenario';
        id: string;
        bannerUrl: string;
        credits: string;
        fullStory: string;
        teaser: string;
        title: string;
        owner: {
            __typename?: 'User';
            id: string;
        };
        flashcards: Array<{
            __typename?: 'Flashcard';
            id: string;
            title: string;
            description: string;
            type: string;
            data: any;
        }>;
        plans: Array<{
            __typename?: 'Plan';
            id: string;
            title: string;
            description: string;
            pictureUrl: string;
            pointsOfInterest: Array<{
                __typename?: 'PointOfInterest';
                id: string;
                code: string;
                title: string;
                description: string;
            }>;
        }>;
    };
};
export type UnsealScenarioMutationVariables = Exact<{
    unsealScenarioId: Scalars['String']['input'];
}>;
export type UnsealScenarioMutation = {
    __typename?: 'Mutation';
    unsealScenario: boolean;
};
export type DeleteScenarioMutationVariables = Exact<{
    deleteScenarioId: Scalars['String']['input'];
}>;
export type DeleteScenarioMutation = {
    __typename?: 'Mutation';
    deleteScenario: boolean;
};
export type CreateScenarioMutationVariables = Exact<{
    data: NewScenarioInput;
}>;
export type CreateScenarioMutation = {
    __typename?: 'Mutation';
    createScenario: {
        __typename?: 'Scenario';
        id: string;
        title: string;
        teaser: string;
        fullStory: string;
        bannerUrl: string;
        credits: string;
    };
};
export type UpdateScenarioMutationVariables = Exact<{
    id: Scalars['String']['input'];
    data: ScenarioInput;
}>;
export type UpdateScenarioMutation = {
    __typename?: 'Mutation';
    updateScenario: {
        __typename?: 'Scenario';
        id: string;
        title: string;
        teaser: string;
        fullStory: string;
        bannerUrl: string;
        credits: string;
    };
};
export type GetTypesQueryVariables = Exact<{
    getMessagesByCampaignId: Scalars['String']['input'];
}>;
export type GetTypesQuery = {
    __typename?: 'Query';
    messages: Array<{
        __typename?: 'Message';
        id: string;
        content: string;
        createdAt: any;
        owner: {
            __typename?: 'User';
            id: string;
            name: string;
        };
        campaign: {
            __typename?: 'Campaign';
            id: string;
            title: string;
        };
    }>;
};
export type GetAllUsersQueryVariables = Exact<{
    [key: string]: never;
}>;
export type GetAllUsersQuery = {
    __typename?: 'Query';
    getAllUsers: Array<{
        __typename?: 'User';
        id: string;
        name: string;
        roles: Array<Roles>;
    }>;
};
export declare const SignupDocument: Apollo.DocumentNode;
export type SignupMutationFn = Apollo.MutationFunction<SignupMutation, SignupMutationVariables>;
/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export declare function useSignupMutation(baseOptions?: Apollo.MutationHookOptions<SignupMutation, SignupMutationVariables>): Apollo.MutationTuple<SignupMutation, Exact<{
    data: NewUserInput;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>;
export type SignupMutationOptions = Apollo.BaseMutationOptions<SignupMutation, SignupMutationVariables>;
export declare const LoginDocument: Apollo.DocumentNode;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;
/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export declare function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>): Apollo.MutationTuple<LoginMutation, Exact<{
    data: UserInput;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export declare const LogoutDocument: Apollo.DocumentNode;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;
/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export declare function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>): Apollo.MutationTuple<LogoutMutation, Exact<{
    [key: string]: never;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export declare const GetMyCampaignsDocument: Apollo.DocumentNode;
/**
 * __useGetMyCampaignsQuery__
 *
 * To run a query within a React component, call `useGetMyCampaignsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyCampaignsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyCampaignsQuery({
 *   variables: {
 *   },
 * });
 */
export declare function useGetMyCampaignsQuery(baseOptions?: Apollo.QueryHookOptions<GetMyCampaignsQuery, GetMyCampaignsQueryVariables>): Apollo.QueryResult<GetMyCampaignsQuery, Exact<{
    [key: string]: never;
}>>;
export declare function useGetMyCampaignsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyCampaignsQuery, GetMyCampaignsQueryVariables>): Apollo.LazyQueryResultTuple<GetMyCampaignsQuery, Exact<{
    [key: string]: never;
}>>;
export declare function useGetMyCampaignsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMyCampaignsQuery, GetMyCampaignsQueryVariables>): Apollo.UseSuspenseQueryResult<GetMyCampaignsQuery | undefined, Exact<{
    [key: string]: never;
}>>;
export type GetMyCampaignsQueryHookResult = ReturnType<typeof useGetMyCampaignsQuery>;
export type GetMyCampaignsLazyQueryHookResult = ReturnType<typeof useGetMyCampaignsLazyQuery>;
export type GetMyCampaignsSuspenseQueryHookResult = ReturnType<typeof useGetMyCampaignsSuspenseQuery>;
export type GetMyCampaignsQueryResult = Apollo.QueryResult<GetMyCampaignsQuery, GetMyCampaignsQueryVariables>;
export declare const GetCampaignDocument: Apollo.DocumentNode;
/**
 * __useGetCampaignQuery__
 *
 * To run a query within a React component, call `useGetCampaignQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCampaignQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCampaignQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export declare function useGetCampaignQuery(baseOptions: Apollo.QueryHookOptions<GetCampaignQuery, GetCampaignQueryVariables> & ({
    variables: GetCampaignQueryVariables;
    skip?: boolean;
} | {
    skip: boolean;
})): Apollo.QueryResult<GetCampaignQuery, Exact<{
    id: Scalars["String"]["input"];
}>>;
export declare function useGetCampaignLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCampaignQuery, GetCampaignQueryVariables>): Apollo.LazyQueryResultTuple<GetCampaignQuery, Exact<{
    id: Scalars["String"]["input"];
}>>;
export declare function useGetCampaignSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCampaignQuery, GetCampaignQueryVariables>): Apollo.UseSuspenseQueryResult<GetCampaignQuery | undefined, Exact<{
    id: Scalars["String"]["input"];
}>>;
export type GetCampaignQueryHookResult = ReturnType<typeof useGetCampaignQuery>;
export type GetCampaignLazyQueryHookResult = ReturnType<typeof useGetCampaignLazyQuery>;
export type GetCampaignSuspenseQueryHookResult = ReturnType<typeof useGetCampaignSuspenseQuery>;
export type GetCampaignQueryResult = Apollo.QueryResult<GetCampaignQuery, GetCampaignQueryVariables>;
export declare const CreateCampaignDocument: Apollo.DocumentNode;
export type CreateCampaignMutationFn = Apollo.MutationFunction<CreateCampaignMutation, CreateCampaignMutationVariables>;
/**
 * __useCreateCampaignMutation__
 *
 * To run a mutation, you first call `useCreateCampaignMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCampaignMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCampaignMutation, { data, loading, error }] = useCreateCampaignMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export declare function useCreateCampaignMutation(baseOptions?: Apollo.MutationHookOptions<CreateCampaignMutation, CreateCampaignMutationVariables>): Apollo.MutationTuple<CreateCampaignMutation, Exact<{
    data: NewCampaignInput;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export type CreateCampaignMutationHookResult = ReturnType<typeof useCreateCampaignMutation>;
export type CreateCampaignMutationResult = Apollo.MutationResult<CreateCampaignMutation>;
export type CreateCampaignMutationOptions = Apollo.BaseMutationOptions<CreateCampaignMutation, CreateCampaignMutationVariables>;
export declare const GetCampaignAndNotesDocument: Apollo.DocumentNode;
/**
 * __useGetCampaignAndNotesQuery__
 *
 * To run a query within a React component, call `useGetCampaignAndNotesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCampaignAndNotesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCampaignAndNotesQuery({
 *   variables: {
 *      campaignId: // value for 'campaignId'
 *   },
 * });
 */
export declare function useGetCampaignAndNotesQuery(baseOptions: Apollo.QueryHookOptions<GetCampaignAndNotesQuery, GetCampaignAndNotesQueryVariables> & ({
    variables: GetCampaignAndNotesQueryVariables;
    skip?: boolean;
} | {
    skip: boolean;
})): Apollo.QueryResult<GetCampaignAndNotesQuery, Exact<{
    campaignId: Scalars["String"]["input"];
}>>;
export declare function useGetCampaignAndNotesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCampaignAndNotesQuery, GetCampaignAndNotesQueryVariables>): Apollo.LazyQueryResultTuple<GetCampaignAndNotesQuery, Exact<{
    campaignId: Scalars["String"]["input"];
}>>;
export declare function useGetCampaignAndNotesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCampaignAndNotesQuery, GetCampaignAndNotesQueryVariables>): Apollo.UseSuspenseQueryResult<GetCampaignAndNotesQuery | undefined, Exact<{
    campaignId: Scalars["String"]["input"];
}>>;
export type GetCampaignAndNotesQueryHookResult = ReturnType<typeof useGetCampaignAndNotesQuery>;
export type GetCampaignAndNotesLazyQueryHookResult = ReturnType<typeof useGetCampaignAndNotesLazyQuery>;
export type GetCampaignAndNotesSuspenseQueryHookResult = ReturnType<typeof useGetCampaignAndNotesSuspenseQuery>;
export type GetCampaignAndNotesQueryResult = Apollo.QueryResult<GetCampaignAndNotesQuery, GetCampaignAndNotesQueryVariables>;
export declare const GetMessagesByCampaignDocument: Apollo.DocumentNode;
/**
 * __useGetMessagesByCampaignQuery__
 *
 * To run a query within a React component, call `useGetMessagesByCampaignQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMessagesByCampaignQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMessagesByCampaignQuery({
 *   variables: {
 *      campaignId: // value for 'campaignId'
 *   },
 * });
 */
export declare function useGetMessagesByCampaignQuery(baseOptions: Apollo.QueryHookOptions<GetMessagesByCampaignQuery, GetMessagesByCampaignQueryVariables> & ({
    variables: GetMessagesByCampaignQueryVariables;
    skip?: boolean;
} | {
    skip: boolean;
})): Apollo.QueryResult<GetMessagesByCampaignQuery, Exact<{
    campaignId: Scalars["String"]["input"];
}>>;
export declare function useGetMessagesByCampaignLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMessagesByCampaignQuery, GetMessagesByCampaignQueryVariables>): Apollo.LazyQueryResultTuple<GetMessagesByCampaignQuery, Exact<{
    campaignId: Scalars["String"]["input"];
}>>;
export declare function useGetMessagesByCampaignSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMessagesByCampaignQuery, GetMessagesByCampaignQueryVariables>): Apollo.UseSuspenseQueryResult<GetMessagesByCampaignQuery | undefined, Exact<{
    campaignId: Scalars["String"]["input"];
}>>;
export type GetMessagesByCampaignQueryHookResult = ReturnType<typeof useGetMessagesByCampaignQuery>;
export type GetMessagesByCampaignLazyQueryHookResult = ReturnType<typeof useGetMessagesByCampaignLazyQuery>;
export type GetMessagesByCampaignSuspenseQueryHookResult = ReturnType<typeof useGetMessagesByCampaignSuspenseQuery>;
export type GetMessagesByCampaignQueryResult = Apollo.QueryResult<GetMessagesByCampaignQuery, GetMessagesByCampaignQueryVariables>;
export declare const GetStatsDocument: Apollo.DocumentNode;
/**
 * __useGetStatsQuery__
 *
 * To run a query within a React component, call `useGetStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStatsQuery({
 *   variables: {
 *   },
 * });
 */
export declare function useGetStatsQuery(baseOptions?: Apollo.QueryHookOptions<GetStatsQuery, GetStatsQueryVariables>): Apollo.QueryResult<GetStatsQuery, Exact<{
    [key: string]: never;
}>>;
export declare function useGetStatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetStatsQuery, GetStatsQueryVariables>): Apollo.LazyQueryResultTuple<GetStatsQuery, Exact<{
    [key: string]: never;
}>>;
export declare function useGetStatsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetStatsQuery, GetStatsQueryVariables>): Apollo.UseSuspenseQueryResult<GetStatsQuery | undefined, Exact<{
    [key: string]: never;
}>>;
export type GetStatsQueryHookResult = ReturnType<typeof useGetStatsQuery>;
export type GetStatsLazyQueryHookResult = ReturnType<typeof useGetStatsLazyQuery>;
export type GetStatsSuspenseQueryHookResult = ReturnType<typeof useGetStatsSuspenseQuery>;
export type GetStatsQueryResult = Apollo.QueryResult<GetStatsQuery, GetStatsQueryVariables>;
export declare const EditNotesDocument: Apollo.DocumentNode;
export type EditNotesMutationFn = Apollo.MutationFunction<EditNotesMutation, EditNotesMutationVariables>;
/**
 * __useEditNotesMutation__
 *
 * To run a mutation, you first call `useEditNotesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditNotesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editNotesMutation, { data, loading, error }] = useEditNotesMutation({
 *   variables: {
 *      noteId: // value for 'noteId'
 *      content: // value for 'content'
 *   },
 * });
 */
export declare function useEditNotesMutation(baseOptions?: Apollo.MutationHookOptions<EditNotesMutation, EditNotesMutationVariables>): Apollo.MutationTuple<EditNotesMutation, Exact<{
    noteId: Scalars["String"]["input"];
    content: Scalars["String"]["input"];
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export type EditNotesMutationHookResult = ReturnType<typeof useEditNotesMutation>;
export type EditNotesMutationResult = Apollo.MutationResult<EditNotesMutation>;
export type EditNotesMutationOptions = Apollo.BaseMutationOptions<EditNotesMutation, EditNotesMutationVariables>;
export declare const CreatePlanDocument: Apollo.DocumentNode;
export type CreatePlanMutationFn = Apollo.MutationFunction<CreatePlanMutation, CreatePlanMutationVariables>;
/**
 * __useCreatePlanMutation__
 *
 * To run a mutation, you first call `useCreatePlanMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePlanMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPlanMutation, { data, loading, error }] = useCreatePlanMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export declare function useCreatePlanMutation(baseOptions?: Apollo.MutationHookOptions<CreatePlanMutation, CreatePlanMutationVariables>): Apollo.MutationTuple<CreatePlanMutation, Exact<{
    data: NewPlanInput;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export type CreatePlanMutationHookResult = ReturnType<typeof useCreatePlanMutation>;
export type CreatePlanMutationResult = Apollo.MutationResult<CreatePlanMutation>;
export type CreatePlanMutationOptions = Apollo.BaseMutationOptions<CreatePlanMutation, CreatePlanMutationVariables>;
export declare const UpdatePlanDocument: Apollo.DocumentNode;
export type UpdatePlanMutationFn = Apollo.MutationFunction<UpdatePlanMutation, UpdatePlanMutationVariables>;
/**
 * __useUpdatePlanMutation__
 *
 * To run a mutation, you first call `useUpdatePlanMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePlanMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePlanMutation, { data, loading, error }] = useUpdatePlanMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export declare function useUpdatePlanMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePlanMutation, UpdatePlanMutationVariables>): Apollo.MutationTuple<UpdatePlanMutation, Exact<{
    id: Scalars["String"]["input"];
    data: PlanInput;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export type UpdatePlanMutationHookResult = ReturnType<typeof useUpdatePlanMutation>;
export type UpdatePlanMutationResult = Apollo.MutationResult<UpdatePlanMutation>;
export type UpdatePlanMutationOptions = Apollo.BaseMutationOptions<UpdatePlanMutation, UpdatePlanMutationVariables>;
export declare const GetPlanDocument: Apollo.DocumentNode;
/**
 * __useGetPlanQuery__
 *
 * To run a query within a React component, call `useGetPlanQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPlanQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPlanQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export declare function useGetPlanQuery(baseOptions: Apollo.QueryHookOptions<GetPlanQuery, GetPlanQueryVariables> & ({
    variables: GetPlanQueryVariables;
    skip?: boolean;
} | {
    skip: boolean;
})): Apollo.QueryResult<GetPlanQuery, Exact<{
    id: Scalars["String"]["input"];
}>>;
export declare function useGetPlanLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPlanQuery, GetPlanQueryVariables>): Apollo.LazyQueryResultTuple<GetPlanQuery, Exact<{
    id: Scalars["String"]["input"];
}>>;
export declare function useGetPlanSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPlanQuery, GetPlanQueryVariables>): Apollo.UseSuspenseQueryResult<GetPlanQuery | undefined, Exact<{
    id: Scalars["String"]["input"];
}>>;
export type GetPlanQueryHookResult = ReturnType<typeof useGetPlanQuery>;
export type GetPlanLazyQueryHookResult = ReturnType<typeof useGetPlanLazyQuery>;
export type GetPlanSuspenseQueryHookResult = ReturnType<typeof useGetPlanSuspenseQuery>;
export type GetPlanQueryResult = Apollo.QueryResult<GetPlanQuery, GetPlanQueryVariables>;
export declare const CreatePointOfInterestDocument: Apollo.DocumentNode;
export type CreatePointOfInterestMutationFn = Apollo.MutationFunction<CreatePointOfInterestMutation, CreatePointOfInterestMutationVariables>;
/**
 * __useCreatePointOfInterestMutation__
 *
 * To run a mutation, you first call `useCreatePointOfInterestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePointOfInterestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPointOfInterestMutation, { data, loading, error }] = useCreatePointOfInterestMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export declare function useCreatePointOfInterestMutation(baseOptions?: Apollo.MutationHookOptions<CreatePointOfInterestMutation, CreatePointOfInterestMutationVariables>): Apollo.MutationTuple<CreatePointOfInterestMutation, Exact<{
    data: NewPointOfInterestInput;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export type CreatePointOfInterestMutationHookResult = ReturnType<typeof useCreatePointOfInterestMutation>;
export type CreatePointOfInterestMutationResult = Apollo.MutationResult<CreatePointOfInterestMutation>;
export type CreatePointOfInterestMutationOptions = Apollo.BaseMutationOptions<CreatePointOfInterestMutation, CreatePointOfInterestMutationVariables>;
export declare const UpdatePointOfInterestDocument: Apollo.DocumentNode;
export type UpdatePointOfInterestMutationFn = Apollo.MutationFunction<UpdatePointOfInterestMutation, UpdatePointOfInterestMutationVariables>;
/**
 * __useUpdatePointOfInterestMutation__
 *
 * To run a mutation, you first call `useUpdatePointOfInterestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePointOfInterestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePointOfInterestMutation, { data, loading, error }] = useUpdatePointOfInterestMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export declare function useUpdatePointOfInterestMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePointOfInterestMutation, UpdatePointOfInterestMutationVariables>): Apollo.MutationTuple<UpdatePointOfInterestMutation, Exact<{
    id: Scalars["String"]["input"];
    data: PointOfInterestInput;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export type UpdatePointOfInterestMutationHookResult = ReturnType<typeof useUpdatePointOfInterestMutation>;
export type UpdatePointOfInterestMutationResult = Apollo.MutationResult<UpdatePointOfInterestMutation>;
export type UpdatePointOfInterestMutationOptions = Apollo.BaseMutationOptions<UpdatePointOfInterestMutation, UpdatePointOfInterestMutationVariables>;
export declare const GetAllScenariosDocument: Apollo.DocumentNode;
/**
 * __useGetAllScenariosQuery__
 *
 * To run a query within a React component, call `useGetAllScenariosQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllScenariosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllScenariosQuery({
 *   variables: {
 *   },
 * });
 */
export declare function useGetAllScenariosQuery(baseOptions?: Apollo.QueryHookOptions<GetAllScenariosQuery, GetAllScenariosQueryVariables>): Apollo.QueryResult<GetAllScenariosQuery, Exact<{
    [key: string]: never;
}>>;
export declare function useGetAllScenariosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllScenariosQuery, GetAllScenariosQueryVariables>): Apollo.LazyQueryResultTuple<GetAllScenariosQuery, Exact<{
    [key: string]: never;
}>>;
export declare function useGetAllScenariosSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllScenariosQuery, GetAllScenariosQueryVariables>): Apollo.UseSuspenseQueryResult<GetAllScenariosQuery | undefined, Exact<{
    [key: string]: never;
}>>;
export type GetAllScenariosQueryHookResult = ReturnType<typeof useGetAllScenariosQuery>;
export type GetAllScenariosLazyQueryHookResult = ReturnType<typeof useGetAllScenariosLazyQuery>;
export type GetAllScenariosSuspenseQueryHookResult = ReturnType<typeof useGetAllScenariosSuspenseQuery>;
export type GetAllScenariosQueryResult = Apollo.QueryResult<GetAllScenariosQuery, GetAllScenariosQueryVariables>;
export declare const GetMyScenariosDocument: Apollo.DocumentNode;
/**
 * __useGetMyScenariosQuery__
 *
 * To run a query within a React component, call `useGetMyScenariosQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyScenariosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyScenariosQuery({
 *   variables: {
 *   },
 * });
 */
export declare function useGetMyScenariosQuery(baseOptions?: Apollo.QueryHookOptions<GetMyScenariosQuery, GetMyScenariosQueryVariables>): Apollo.QueryResult<GetMyScenariosQuery, Exact<{
    [key: string]: never;
}>>;
export declare function useGetMyScenariosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyScenariosQuery, GetMyScenariosQueryVariables>): Apollo.LazyQueryResultTuple<GetMyScenariosQuery, Exact<{
    [key: string]: never;
}>>;
export declare function useGetMyScenariosSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMyScenariosQuery, GetMyScenariosQueryVariables>): Apollo.UseSuspenseQueryResult<GetMyScenariosQuery | undefined, Exact<{
    [key: string]: never;
}>>;
export type GetMyScenariosQueryHookResult = ReturnType<typeof useGetMyScenariosQuery>;
export type GetMyScenariosLazyQueryHookResult = ReturnType<typeof useGetMyScenariosLazyQuery>;
export type GetMyScenariosSuspenseQueryHookResult = ReturnType<typeof useGetMyScenariosSuspenseQuery>;
export type GetMyScenariosQueryResult = Apollo.QueryResult<GetMyScenariosQuery, GetMyScenariosQueryVariables>;
export declare const GetScenarioDocument: Apollo.DocumentNode;
/**
 * __useGetScenarioQuery__
 *
 * To run a query within a React component, call `useGetScenarioQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetScenarioQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetScenarioQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export declare function useGetScenarioQuery(baseOptions: Apollo.QueryHookOptions<GetScenarioQuery, GetScenarioQueryVariables> & ({
    variables: GetScenarioQueryVariables;
    skip?: boolean;
} | {
    skip: boolean;
})): Apollo.QueryResult<GetScenarioQuery, Exact<{
    id: Scalars["String"]["input"];
}>>;
export declare function useGetScenarioLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetScenarioQuery, GetScenarioQueryVariables>): Apollo.LazyQueryResultTuple<GetScenarioQuery, Exact<{
    id: Scalars["String"]["input"];
}>>;
export declare function useGetScenarioSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetScenarioQuery, GetScenarioQueryVariables>): Apollo.UseSuspenseQueryResult<GetScenarioQuery | undefined, Exact<{
    id: Scalars["String"]["input"];
}>>;
export type GetScenarioQueryHookResult = ReturnType<typeof useGetScenarioQuery>;
export type GetScenarioLazyQueryHookResult = ReturnType<typeof useGetScenarioLazyQuery>;
export type GetScenarioSuspenseQueryHookResult = ReturnType<typeof useGetScenarioSuspenseQuery>;
export type GetScenarioQueryResult = Apollo.QueryResult<GetScenarioQuery, GetScenarioQueryVariables>;
export declare const UnsealScenarioDocument: Apollo.DocumentNode;
export type UnsealScenarioMutationFn = Apollo.MutationFunction<UnsealScenarioMutation, UnsealScenarioMutationVariables>;
/**
 * __useUnsealScenarioMutation__
 *
 * To run a mutation, you first call `useUnsealScenarioMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnsealScenarioMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unsealScenarioMutation, { data, loading, error }] = useUnsealScenarioMutation({
 *   variables: {
 *      unsealScenarioId: // value for 'unsealScenarioId'
 *   },
 * });
 */
export declare function useUnsealScenarioMutation(baseOptions?: Apollo.MutationHookOptions<UnsealScenarioMutation, UnsealScenarioMutationVariables>): Apollo.MutationTuple<UnsealScenarioMutation, Exact<{
    unsealScenarioId: Scalars["String"]["input"];
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export type UnsealScenarioMutationHookResult = ReturnType<typeof useUnsealScenarioMutation>;
export type UnsealScenarioMutationResult = Apollo.MutationResult<UnsealScenarioMutation>;
export type UnsealScenarioMutationOptions = Apollo.BaseMutationOptions<UnsealScenarioMutation, UnsealScenarioMutationVariables>;
export declare const DeleteScenarioDocument: Apollo.DocumentNode;
export type DeleteScenarioMutationFn = Apollo.MutationFunction<DeleteScenarioMutation, DeleteScenarioMutationVariables>;
/**
 * __useDeleteScenarioMutation__
 *
 * To run a mutation, you first call `useDeleteScenarioMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteScenarioMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteScenarioMutation, { data, loading, error }] = useDeleteScenarioMutation({
 *   variables: {
 *      deleteScenarioId: // value for 'deleteScenarioId'
 *   },
 * });
 */
export declare function useDeleteScenarioMutation(baseOptions?: Apollo.MutationHookOptions<DeleteScenarioMutation, DeleteScenarioMutationVariables>): Apollo.MutationTuple<DeleteScenarioMutation, Exact<{
    deleteScenarioId: Scalars["String"]["input"];
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export type DeleteScenarioMutationHookResult = ReturnType<typeof useDeleteScenarioMutation>;
export type DeleteScenarioMutationResult = Apollo.MutationResult<DeleteScenarioMutation>;
export type DeleteScenarioMutationOptions = Apollo.BaseMutationOptions<DeleteScenarioMutation, DeleteScenarioMutationVariables>;
export declare const CreateScenarioDocument: Apollo.DocumentNode;
export type CreateScenarioMutationFn = Apollo.MutationFunction<CreateScenarioMutation, CreateScenarioMutationVariables>;
/**
 * __useCreateScenarioMutation__
 *
 * To run a mutation, you first call `useCreateScenarioMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateScenarioMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createScenarioMutation, { data, loading, error }] = useCreateScenarioMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export declare function useCreateScenarioMutation(baseOptions?: Apollo.MutationHookOptions<CreateScenarioMutation, CreateScenarioMutationVariables>): Apollo.MutationTuple<CreateScenarioMutation, Exact<{
    data: NewScenarioInput;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export type CreateScenarioMutationHookResult = ReturnType<typeof useCreateScenarioMutation>;
export type CreateScenarioMutationResult = Apollo.MutationResult<CreateScenarioMutation>;
export type CreateScenarioMutationOptions = Apollo.BaseMutationOptions<CreateScenarioMutation, CreateScenarioMutationVariables>;
export declare const UpdateScenarioDocument: Apollo.DocumentNode;
export type UpdateScenarioMutationFn = Apollo.MutationFunction<UpdateScenarioMutation, UpdateScenarioMutationVariables>;
/**
 * __useUpdateScenarioMutation__
 *
 * To run a mutation, you first call `useUpdateScenarioMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateScenarioMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateScenarioMutation, { data, loading, error }] = useUpdateScenarioMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export declare function useUpdateScenarioMutation(baseOptions?: Apollo.MutationHookOptions<UpdateScenarioMutation, UpdateScenarioMutationVariables>): Apollo.MutationTuple<UpdateScenarioMutation, Exact<{
    id: Scalars["String"]["input"];
    data: ScenarioInput;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export type UpdateScenarioMutationHookResult = ReturnType<typeof useUpdateScenarioMutation>;
export type UpdateScenarioMutationResult = Apollo.MutationResult<UpdateScenarioMutation>;
export type UpdateScenarioMutationOptions = Apollo.BaseMutationOptions<UpdateScenarioMutation, UpdateScenarioMutationVariables>;
export declare const GetTypesDocument: Apollo.DocumentNode;
/**
 * __useGetTypesQuery__
 *
 * To run a query within a React component, call `useGetTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTypesQuery({
 *   variables: {
 *      getMessagesByCampaignId: // value for 'getMessagesByCampaignId'
 *   },
 * });
 */
export declare function useGetTypesQuery(baseOptions: Apollo.QueryHookOptions<GetTypesQuery, GetTypesQueryVariables> & ({
    variables: GetTypesQueryVariables;
    skip?: boolean;
} | {
    skip: boolean;
})): Apollo.QueryResult<GetTypesQuery, Exact<{
    getMessagesByCampaignId: Scalars["String"]["input"];
}>>;
export declare function useGetTypesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTypesQuery, GetTypesQueryVariables>): Apollo.LazyQueryResultTuple<GetTypesQuery, Exact<{
    getMessagesByCampaignId: Scalars["String"]["input"];
}>>;
export declare function useGetTypesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetTypesQuery, GetTypesQueryVariables>): Apollo.UseSuspenseQueryResult<GetTypesQuery | undefined, Exact<{
    getMessagesByCampaignId: Scalars["String"]["input"];
}>>;
export type GetTypesQueryHookResult = ReturnType<typeof useGetTypesQuery>;
export type GetTypesLazyQueryHookResult = ReturnType<typeof useGetTypesLazyQuery>;
export type GetTypesSuspenseQueryHookResult = ReturnType<typeof useGetTypesSuspenseQuery>;
export type GetTypesQueryResult = Apollo.QueryResult<GetTypesQuery, GetTypesQueryVariables>;
export declare const GetAllUsersDocument: Apollo.DocumentNode;
/**
 * __useGetAllUsersQuery__
 *
 * To run a query within a React component, call `useGetAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllUsersQuery({
 *   variables: {
 *   },
 * });
 */
export declare function useGetAllUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>): Apollo.QueryResult<GetAllUsersQuery, Exact<{
    [key: string]: never;
}>>;
export declare function useGetAllUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>): Apollo.LazyQueryResultTuple<GetAllUsersQuery, Exact<{
    [key: string]: never;
}>>;
export declare function useGetAllUsersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>): Apollo.UseSuspenseQueryResult<GetAllUsersQuery | undefined, Exact<{
    [key: string]: never;
}>>;
export type GetAllUsersQueryHookResult = ReturnType<typeof useGetAllUsersQuery>;
export type GetAllUsersLazyQueryHookResult = ReturnType<typeof useGetAllUsersLazyQuery>;
export type GetAllUsersSuspenseQueryHookResult = ReturnType<typeof useGetAllUsersSuspenseQuery>;
export type GetAllUsersQueryResult = Apollo.QueryResult<GetAllUsersQuery, GetAllUsersQueryVariables>;
