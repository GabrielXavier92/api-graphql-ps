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
    fetchDoctors: Array<IDoctor | null> | null;
    fetchDoctor: IDoctor | null;
    fetchPatient: IPatient | null;
    fetchPatients: Array<IPatient | null> | null;
    fetchServices: Array<IService | null> | null;
    fetchService: IService | null;
    fetchSpecialties: Array<ISpecialty | null> | null;
    fetchSpecialty: ISpecialty | null;
  }

  interface IFetchDoctorOnQueryArguments {
    id: string;
  }

  interface IFetchPatientOnQueryArguments {
    id: string;
  }

  interface IFetchServiceOnQueryArguments {
    id: string;
  }

  interface IFetchSpecialtyOnQueryArguments {
    id: string;
  }

  interface IDoctor {
    __typename: 'Doctor';
    id: string;
    name: string;
    birth: string | null;
    cro: number | null;
    status: boolean | null;
    gender: Gender | null;
    doctorSpecialties: Array<ISpecialty | null> | null;
    doctorServices: Array<IService | null> | null;
  }

  const enum Gender {
    MASCULINO = 'MASCULINO',
    FEMININO = 'FEMININO'
  }

  interface ISpecialty {
    __typename: 'Specialty';
    id: string | null;
    code: number | null;
    name: string | null;
    description: string | null;
  }

  interface IService {
    __typename: 'Service';
    id: string | null;
    code: number | null;
    name: string | null;
    description: string | null;
    value: number | null;
    status: boolean | null;
  }

  interface IPatient {
    __typename: 'Patient';
    id: string | null;
    name: string | null;
    gender: Gender | null;
    birth: string | null;
  }

  interface IMutation {
    __typename: 'Mutation';
    publishArticle: IArticle | null;
    register: IUser | null;
    login: ILogin | null;
    forgotPassword: boolean | null;
    changePassword: boolean | null;
    createDoctor: IDoctor | null;
    updateDoctor: IDoctor | null;
    deleteDoctor: boolean | null;
    createPatient: IPatient | null;
    updatePatient: IPatient | null;
    deletePatient: boolean | null;
    createService: IService | null;
    updateService: IService | null;
    deleteService: boolean | null;
    createSpecialty: ISpecialty | null;
    updateSpecialty: ISpecialty | null;
    deleteSpecialty: boolean | null;
  }

  interface IPublishArticleOnMutationArguments {
    title?: string | null;
    content?: string | null;
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

  interface IChangePasswordOnMutationArguments {
    email: string;
    password: string;
    newPassword: string;
  }

  interface ICreateDoctorOnMutationArguments {
    doctor: IDoctorInput;
  }

  interface IUpdateDoctorOnMutationArguments {
    doctor: IDoctorInput;
  }

  interface IDeleteDoctorOnMutationArguments {
    id: string;
  }

  interface ICreatePatientOnMutationArguments {
    patient: IPatientInput;
  }

  interface IUpdatePatientOnMutationArguments {
    patient: IPatientInput;
  }

  interface IDeletePatientOnMutationArguments {
    id: string;
  }

  interface ICreateServiceOnMutationArguments {
    service: IServiceInput;
  }

  interface IUpdateServiceOnMutationArguments {
    service: IServiceInput;
  }

  interface IDeleteServiceOnMutationArguments {
    id: string;
  }

  interface ICreateSpecialtyOnMutationArguments {
    specialty: ISpecialtyInput;
  }

  interface IUpdateSpecialtyOnMutationArguments {
    specialty: ISpecialtyInput;
  }

  interface IDeleteSpecialtyOnMutationArguments {
    id: string;
  }

  interface IArticle {
    __typename: 'Article';
    title: string;
    content: string;
  }

  interface IUser {
    __typename: 'User';
    id: string;
    name: string | null;
    email: string | null;
    createdAt: string | null;
    updatedAt: string | null;
  }

  interface ILogin {
    __typename: 'Login';
    token: string | null;
  }

  interface IDoctorInput {
    id?: string | null;
    name: string;
    gender?: Gender | null;
    birth?: string | null;
    cro?: number | null;
    status?: boolean | null;
    specialties?: Array<string | null> | null;
    services?: Array<string | null> | null;
  }

  interface IPatientInput {
    id?: string | null;
    name: string;
    gender?: Gender | null;
    birth?: string | null;
  }

  interface IServiceInput {
    id?: string | null;
    name: string;
    code?: number | null;
    description?: string | null;
    value?: number | null;
    status?: boolean | null;
  }

  interface ISpecialtyInput {
    id?: string | null;
    code: number;
    name?: string | null;
    description?: string | null;
  }

  interface ILink {
    __typename: 'Link';
    id: string;
    description: string;
    url: string;
  }
}

// tslint:enable
