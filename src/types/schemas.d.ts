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
    __typename: 'Query';
    me: string | null;
    serverTime: ICommon | null;
  }

  interface ICommon {
    __typename: 'Common';
    message: string | null;
  }

  interface IMutation {
    __typename: 'Mutation';
    publishArticle: IArticle | null;
    post: ILink;
    register: Array<IMessage> | null;
    login: Array<IMessage> | null;
    forgotPassword: Array<IMessage> | null;
  }

  interface IPublishArticleOnMutationArguments {
    title?: string | null;
    content?: string | null;
  }

  interface IPostOnMutationArguments {
    url: string;
    description: string;
  }

  interface IRegisterOnMutationArguments {
    email: string;
    name: string;
    password: string;
  }

  interface ILoginOnMutationArguments {
    email: string;
    password: string;
  }

  interface IForgotPasswordOnMutationArguments {
    email: string;
  }

  interface IArticle {
    __typename: 'Article';
    title: string;
    content: string;
  }

  interface ILink {
    __typename: 'Link';
    id: string;
    description: string;
    url: string;
  }

  interface IMessage {
    __typename: 'Message';
    path: string;
    message: string;
    statusCode: number | null;
  }
}

// tslint:enable
