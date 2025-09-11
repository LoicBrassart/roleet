"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllUsersDocument = exports.GetTypesDocument = exports.UpdateScenarioDocument = exports.CreateScenarioDocument = exports.DeleteScenarioDocument = exports.UnsealScenarioDocument = exports.GetScenarioDocument = exports.GetMyScenariosDocument = exports.GetAllScenariosDocument = exports.UpdatePointOfInterestDocument = exports.CreatePointOfInterestDocument = exports.GetPlanDocument = exports.UpdatePlanDocument = exports.CreatePlanDocument = exports.EditNotesDocument = exports.GetStatsDocument = exports.GetMessagesByCampaignDocument = exports.GetCampaignAndNotesDocument = exports.CreateCampaignDocument = exports.GetCampaignDocument = exports.GetMyCampaignsDocument = exports.LogoutDocument = exports.LoginDocument = exports.SignupDocument = exports.Roles = void 0;
exports.useSignupMutation = useSignupMutation;
exports.useLoginMutation = useLoginMutation;
exports.useLogoutMutation = useLogoutMutation;
exports.useGetMyCampaignsQuery = useGetMyCampaignsQuery;
exports.useGetMyCampaignsLazyQuery = useGetMyCampaignsLazyQuery;
exports.useGetMyCampaignsSuspenseQuery = useGetMyCampaignsSuspenseQuery;
exports.useGetCampaignQuery = useGetCampaignQuery;
exports.useGetCampaignLazyQuery = useGetCampaignLazyQuery;
exports.useGetCampaignSuspenseQuery = useGetCampaignSuspenseQuery;
exports.useCreateCampaignMutation = useCreateCampaignMutation;
exports.useGetCampaignAndNotesQuery = useGetCampaignAndNotesQuery;
exports.useGetCampaignAndNotesLazyQuery = useGetCampaignAndNotesLazyQuery;
exports.useGetCampaignAndNotesSuspenseQuery = useGetCampaignAndNotesSuspenseQuery;
exports.useGetMessagesByCampaignQuery = useGetMessagesByCampaignQuery;
exports.useGetMessagesByCampaignLazyQuery = useGetMessagesByCampaignLazyQuery;
exports.useGetMessagesByCampaignSuspenseQuery = useGetMessagesByCampaignSuspenseQuery;
exports.useGetStatsQuery = useGetStatsQuery;
exports.useGetStatsLazyQuery = useGetStatsLazyQuery;
exports.useGetStatsSuspenseQuery = useGetStatsSuspenseQuery;
exports.useEditNotesMutation = useEditNotesMutation;
exports.useCreatePlanMutation = useCreatePlanMutation;
exports.useUpdatePlanMutation = useUpdatePlanMutation;
exports.useGetPlanQuery = useGetPlanQuery;
exports.useGetPlanLazyQuery = useGetPlanLazyQuery;
exports.useGetPlanSuspenseQuery = useGetPlanSuspenseQuery;
exports.useCreatePointOfInterestMutation = useCreatePointOfInterestMutation;
exports.useUpdatePointOfInterestMutation = useUpdatePointOfInterestMutation;
exports.useGetAllScenariosQuery = useGetAllScenariosQuery;
exports.useGetAllScenariosLazyQuery = useGetAllScenariosLazyQuery;
exports.useGetAllScenariosSuspenseQuery = useGetAllScenariosSuspenseQuery;
exports.useGetMyScenariosQuery = useGetMyScenariosQuery;
exports.useGetMyScenariosLazyQuery = useGetMyScenariosLazyQuery;
exports.useGetMyScenariosSuspenseQuery = useGetMyScenariosSuspenseQuery;
exports.useGetScenarioQuery = useGetScenarioQuery;
exports.useGetScenarioLazyQuery = useGetScenarioLazyQuery;
exports.useGetScenarioSuspenseQuery = useGetScenarioSuspenseQuery;
exports.useUnsealScenarioMutation = useUnsealScenarioMutation;
exports.useDeleteScenarioMutation = useDeleteScenarioMutation;
exports.useCreateScenarioMutation = useCreateScenarioMutation;
exports.useUpdateScenarioMutation = useUpdateScenarioMutation;
exports.useGetTypesQuery = useGetTypesQuery;
exports.useGetTypesLazyQuery = useGetTypesLazyQuery;
exports.useGetTypesSuspenseQuery = useGetTypesSuspenseQuery;
exports.useGetAllUsersQuery = useGetAllUsersQuery;
exports.useGetAllUsersLazyQuery = useGetAllUsersLazyQuery;
exports.useGetAllUsersSuspenseQuery = useGetAllUsersSuspenseQuery;
const client_1 = require("@apollo/client");
const Apollo = __importStar(require("@apollo/client"));
const defaultOptions = {};
/** Roles for users in this app */
var Roles;
(function (Roles) {
    Roles["Admin"] = "ADMIN";
    Roles["User"] = "USER";
})(Roles || (exports.Roles = Roles = {}));
exports.SignupDocument = (0, client_1.gql) `
    mutation signup($data: NewUserInput!) {
  signup(data: $data)
}
    `;
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
function useSignupMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.SignupDocument, options);
}
exports.LoginDocument = (0, client_1.gql) `
    mutation login($data: UserInput!) {
  login(data: $data)
}
    `;
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
function useLoginMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.LoginDocument, options);
}
exports.LogoutDocument = (0, client_1.gql) `
    mutation logout {
  logout
}
    `;
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
function useLogoutMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.LogoutDocument, options);
}
exports.GetMyCampaignsDocument = (0, client_1.gql) `
    query getMyCampaigns {
  getMyCampaigns {
    id
    bannerUrl
    title
    storyteller {
      id
      name
    }
    scenarios {
      id
      title
    }
    players {
      id
      name
    }
    sessions {
      id
      location
      programmedAt
      summary
    }
  }
}
    `;
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
function useGetMyCampaignsQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(exports.GetMyCampaignsDocument, options);
}
function useGetMyCampaignsLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(exports.GetMyCampaignsDocument, options);
}
function useGetMyCampaignsSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(exports.GetMyCampaignsDocument, options);
}
exports.GetCampaignDocument = (0, client_1.gql) `
    query getCampaign($id: String!) {
  getCampaign(id: $id) {
    id
    bannerUrl
    title
    storyteller {
      id
      name
    }
    scenarios {
      id
      title
    }
    players {
      id
      name
    }
    messages {
      id
      content
      createdAt
    }
    sessions {
      id
      location
      programmedAt
      summary
    }
  }
}
    `;
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
function useGetCampaignQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(exports.GetCampaignDocument, options);
}
function useGetCampaignLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(exports.GetCampaignDocument, options);
}
function useGetCampaignSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(exports.GetCampaignDocument, options);
}
exports.CreateCampaignDocument = (0, client_1.gql) `
    mutation createCampaign($data: NewCampaignInput!) {
  createCampaign(data: $data) {
    id
    bannerUrl
    title
  }
}
    `;
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
function useCreateCampaignMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.CreateCampaignDocument, options);
}
exports.GetCampaignAndNotesDocument = (0, client_1.gql) `
    query getCampaignAndNotes($campaignId: String!) {
  getCampaign(id: $campaignId) {
    id
    bannerUrl
    title
    storyteller {
      id
      name
    }
    scenarios {
      id
      title
    }
    players {
      id
      name
    }
    sessions {
      id
      location
      programmedAt
      summary
    }
  }
  getNotes(campaignId: $campaignId) {
    id
    content
  }
  getMessagesByCampaign(id: $campaignId) {
    id
    content
    createdAt
    owner {
      id
      name
    }
  }
}
    `;
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
function useGetCampaignAndNotesQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(exports.GetCampaignAndNotesDocument, options);
}
function useGetCampaignAndNotesLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(exports.GetCampaignAndNotesDocument, options);
}
function useGetCampaignAndNotesSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(exports.GetCampaignAndNotesDocument, options);
}
exports.GetMessagesByCampaignDocument = (0, client_1.gql) `
    query getMessagesByCampaign($campaignId: String!) {
  messages: getMessagesByCampaign(id: $campaignId) {
    id
    content
    createdAt
    owner {
      id
    }
    campaign {
      id
    }
  }
}
    `;
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
function useGetMessagesByCampaignQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(exports.GetMessagesByCampaignDocument, options);
}
function useGetMessagesByCampaignLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(exports.GetMessagesByCampaignDocument, options);
}
function useGetMessagesByCampaignSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(exports.GetMessagesByCampaignDocument, options);
}
exports.GetStatsDocument = (0, client_1.gql) `
    query getStats {
  stats: getStats {
    campaigns
    flashcards
    plans
    scenarios
    users
  }
}
    `;
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
function useGetStatsQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(exports.GetStatsDocument, options);
}
function useGetStatsLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(exports.GetStatsDocument, options);
}
function useGetStatsSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(exports.GetStatsDocument, options);
}
exports.EditNotesDocument = (0, client_1.gql) `
    mutation EditNotes($noteId: String!, $content: String!) {
  editNotes(noteId: $noteId, content: $content) {
    id
  }
}
    `;
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
function useEditNotesMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.EditNotesDocument, options);
}
exports.CreatePlanDocument = (0, client_1.gql) `
    mutation createPlan($data: NewPlanInput!) {
  createPlan(data: $data) {
    id
  }
}
    `;
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
function useCreatePlanMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.CreatePlanDocument, options);
}
exports.UpdatePlanDocument = (0, client_1.gql) `
    mutation updatePlan($id: String!, $data: PlanInput!) {
  updatePlan(id: $id, data: $data) {
    id
  }
}
    `;
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
function useUpdatePlanMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.UpdatePlanDocument, options);
}
exports.GetPlanDocument = (0, client_1.gql) `
    query getPlan($id: String!) {
  getPlan(id: $id) {
    id
    title
    description
    pictureUrl
    owner {
      id
    }
    pointsOfInterest {
      id
      code
      title
      description
    }
    scenario {
      id
      bannerUrl
      credits
      fullStory
      teaser
      title
    }
  }
}
    `;
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
function useGetPlanQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(exports.GetPlanDocument, options);
}
function useGetPlanLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(exports.GetPlanDocument, options);
}
function useGetPlanSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(exports.GetPlanDocument, options);
}
exports.CreatePointOfInterestDocument = (0, client_1.gql) `
    mutation createPointOfInterest($data: NewPointOfInterestInput!) {
  createPointOfInterest(data: $data) {
    id
  }
}
    `;
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
function useCreatePointOfInterestMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.CreatePointOfInterestDocument, options);
}
exports.UpdatePointOfInterestDocument = (0, client_1.gql) `
    mutation updatePointOfInterest($id: String!, $data: PointOfInterestInput!) {
  updatePointOfInterest(id: $id, data: $data) {
    id
  }
}
    `;
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
function useUpdatePointOfInterestMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.UpdatePointOfInterestDocument, options);
}
exports.GetAllScenariosDocument = (0, client_1.gql) `
    query getAllScenarios {
  getAllScenarios {
    id
    title
    teaser
    bannerUrl
    credits
  }
}
    `;
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
function useGetAllScenariosQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(exports.GetAllScenariosDocument, options);
}
function useGetAllScenariosLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(exports.GetAllScenariosDocument, options);
}
function useGetAllScenariosSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(exports.GetAllScenariosDocument, options);
}
exports.GetMyScenariosDocument = (0, client_1.gql) `
    query getMyScenarios {
  getMyScenarios {
    id
    title
    teaser
    bannerUrl
    credits
  }
}
    `;
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
function useGetMyScenariosQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(exports.GetMyScenariosDocument, options);
}
function useGetMyScenariosLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(exports.GetMyScenariosDocument, options);
}
function useGetMyScenariosSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(exports.GetMyScenariosDocument, options);
}
exports.GetScenarioDocument = (0, client_1.gql) `
    query getScenario($id: String!) {
  getScenario(id: $id) {
    id
    bannerUrl
    credits
    fullStory
    teaser
    title
    owner {
      id
    }
    flashcards {
      id
      title
      description
      type
      data
    }
    plans {
      id
      title
      description
      pictureUrl
      pointsOfInterest {
        id
        code
        title
        description
      }
    }
  }
}
    `;
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
function useGetScenarioQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(exports.GetScenarioDocument, options);
}
function useGetScenarioLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(exports.GetScenarioDocument, options);
}
function useGetScenarioSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(exports.GetScenarioDocument, options);
}
exports.UnsealScenarioDocument = (0, client_1.gql) `
    mutation unsealScenario($unsealScenarioId: String!) {
  unsealScenario(id: $unsealScenarioId)
}
    `;
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
function useUnsealScenarioMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.UnsealScenarioDocument, options);
}
exports.DeleteScenarioDocument = (0, client_1.gql) `
    mutation deleteScenario($deleteScenarioId: String!) {
  deleteScenario(id: $deleteScenarioId)
}
    `;
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
function useDeleteScenarioMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.DeleteScenarioDocument, options);
}
exports.CreateScenarioDocument = (0, client_1.gql) `
    mutation createScenario($data: NewScenarioInput!) {
  createScenario(data: $data) {
    id
    title
    teaser
    fullStory
    bannerUrl
    credits
  }
}
    `;
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
function useCreateScenarioMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.CreateScenarioDocument, options);
}
exports.UpdateScenarioDocument = (0, client_1.gql) `
    mutation updateScenario($id: String!, $data: ScenarioInput!) {
  updateScenario(id: $id, data: $data) {
    id
    title
    teaser
    fullStory
    bannerUrl
    credits
  }
}
    `;
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
function useUpdateScenarioMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.UpdateScenarioDocument, options);
}
exports.GetTypesDocument = (0, client_1.gql) `
    query getTypes($getMessagesByCampaignId: String!) {
  messages: getMessagesByCampaign(id: $getMessagesByCampaignId) {
    id
    content
    createdAt
    owner {
      id
      name
    }
    campaign {
      id
      title
    }
  }
}
    `;
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
function useGetTypesQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(exports.GetTypesDocument, options);
}
function useGetTypesLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(exports.GetTypesDocument, options);
}
function useGetTypesSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(exports.GetTypesDocument, options);
}
exports.GetAllUsersDocument = (0, client_1.gql) `
    query getAllUsers {
  getAllUsers {
    id
    name
    roles
  }
}
    `;
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
function useGetAllUsersQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(exports.GetAllUsersDocument, options);
}
function useGetAllUsersLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(exports.GetAllUsersDocument, options);
}
function useGetAllUsersSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(exports.GetAllUsersDocument, options);
}
