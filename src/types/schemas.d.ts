// tslint:disable
// graphql typescript definitions

declare namespace GQL {
  interface IGraphQLResponseRoot {
    data?: IQuery | IMutation;
    errors?: Array<IGraphQLResponseError>;
  }

  interface IGraphQLResponseError {
    /** Required for all errors */
    message: string;
    locations?: Array<IGraphQLResponseErrorLocation>;
    /** 7.2.2 says 'GraphQL servers may provide additional entries to error' */
    [propName: string]: any;
  }

  interface IGraphQLResponseErrorLocation {
    line: number;
    column: number;
  }

  interface IQuery {
    __typename: "Query";
    me: IUser | null;
    serverTime: ICommon | null;
  }

  interface IUser {
    __typename: "User";
    id: string;
    username: string;
  }

  interface ICommon {
    __typename: "Common";
    message: string | null;
  }

  interface IMutation {
    __typename: "Mutation";
    publishArticle: IArticle | null;
    post: ILink;
  }

  interface IPublishArticleOnMutationArguments {
    title?: string | null;
    content?: string | null;
  }

  interface IPostOnMutationArguments {
    url: string;
    description: string;
  }

  interface IArticle {
    __typename: "Article";
    title: string;
    content: string;
  }

  interface ILink {
    __typename: "Link";
    id: string;
    description: string;
    url: string;
  }
}

// tslint:enable
