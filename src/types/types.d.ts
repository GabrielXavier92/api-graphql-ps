export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type Article = {
   __typename?: 'Article',
  title: Scalars['String'],
  content: Scalars['String'],
};

export type Doctor = {
   __typename?: 'Doctor',
  id: Scalars['ID'],
  name: Scalars['String'],
  birth?: Maybe<Scalars['String']>,
  cro?: Maybe<Scalars['Int']>,
  status?: Maybe<Scalars['Boolean']>,
  gender?: Maybe<Gender>,
  specialties?: Maybe<Array<Maybe<Specialty>>>,
  services?: Maybe<Array<Maybe<Service>>>,
};

export type DoctorInput = {
  id?: Maybe<Scalars['ID']>,
  name: Scalars['String'],
  gender?: Maybe<Gender>,
  birth?: Maybe<Scalars['String']>,
  cro?: Maybe<Scalars['Int']>,
  status?: Maybe<Scalars['Boolean']>,
  specialties?: Maybe<Array<Maybe<Scalars['ID']>>>,
  services?: Maybe<Array<Maybe<Scalars['ID']>>>,
};

export enum Gender {
  Masculino = 'MASCULINO',
  Feminino = 'FEMININO'
}

export type Link = {
   __typename?: 'Link',
  id: Scalars['ID'],
  description: Scalars['String'],
  url: Scalars['String'],
};

export type Login = {
   __typename?: 'Login',
  token?: Maybe<Scalars['String']>,
};

export type Mutation = {
   __typename?: 'Mutation',
  register?: Maybe<User>,
  login?: Maybe<Login>,
  forgotPassword?: Maybe<Scalars['Boolean']>,
  changePassword?: Maybe<Scalars['Boolean']>,
  publishArticle?: Maybe<Article>,
  createDoctor?: Maybe<Doctor>,
  updateDoctor?: Maybe<Doctor>,
  deleteDoctor?: Maybe<Scalars['Boolean']>,
  createSpecialty?: Maybe<Specialty>,
  updateSpecialty?: Maybe<Specialty>,
  deleteSpecialty?: Maybe<Scalars['Boolean']>,
  createService?: Maybe<Service>,
  updateService?: Maybe<Service>,
  deleteService?: Maybe<Scalars['Boolean']>,
  createSchedule?: Maybe<Schedule>,
  updateSchedule?: Maybe<Schedule>,
  deleteSchedule?: Maybe<Scalars['Boolean']>,
  createPatient?: Maybe<Patient>,
  updatePatient?: Maybe<Patient>,
  deletePatient?: Maybe<Scalars['Boolean']>,
};


export type MutationRegisterArgs = {
  email: Scalars['String'],
  name: Scalars['String'],
  password: Scalars['String']
};


export type MutationLoginArgs = {
  email: Scalars['String'],
  password: Scalars['String']
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String']
};


export type MutationChangePasswordArgs = {
  email: Scalars['String'],
  password: Scalars['String'],
  newPassword: Scalars['String']
};


export type MutationPublishArticleArgs = {
  title?: Maybe<Scalars['String']>,
  content?: Maybe<Scalars['String']>
};


export type MutationCreateDoctorArgs = {
  doctor: DoctorInput
};


export type MutationUpdateDoctorArgs = {
  doctor: DoctorInput
};


export type MutationDeleteDoctorArgs = {
  id: Scalars['ID']
};


export type MutationCreateSpecialtyArgs = {
  specialty: SpecialtyInput
};


export type MutationUpdateSpecialtyArgs = {
  specialty: SpecialtyInput
};


export type MutationDeleteSpecialtyArgs = {
  id: Scalars['ID']
};


export type MutationCreateServiceArgs = {
  service: ServiceInput
};


export type MutationUpdateServiceArgs = {
  service: ServiceInput
};


export type MutationDeleteServiceArgs = {
  id: Scalars['ID']
};


export type MutationCreateScheduleArgs = {
  schedule: ScheduleInput
};


export type MutationUpdateScheduleArgs = {
  schedule: ScheduleInput
};


export type MutationDeleteScheduleArgs = {
  id: Scalars['ID']
};


export type MutationCreatePatientArgs = {
  patient: PatientInput
};


export type MutationUpdatePatientArgs = {
  patient: PatientInput
};


export type MutationDeletePatientArgs = {
  id: Scalars['ID']
};

export type Patient = {
   __typename?: 'Patient',
  id: Scalars['ID'],
  name: Scalars['String'],
  gender?: Maybe<Gender>,
  birth?: Maybe<Scalars['String']>,
};

export type PatientInput = {
  id?: Maybe<Scalars['ID']>,
  name: Scalars['String'],
  gender?: Maybe<Gender>,
  birth?: Maybe<Scalars['String']>,
};

export type Query = {
   __typename?: 'Query',
  me?: Maybe<Scalars['String']>,
  fetchDoctors?: Maybe<Array<Maybe<Doctor>>>,
  fetchDoctor?: Maybe<Doctor>,
  fetchSpecialties?: Maybe<Array<Maybe<Specialty>>>,
  fetchSpecialty?: Maybe<Specialty>,
  fetchServices?: Maybe<Array<Maybe<Service>>>,
  fetchService?: Maybe<Service>,
  fetchSchedule?: Maybe<Schedule>,
  fetchSchedules?: Maybe<Array<Maybe<Schedule>>>,
  fetchPatient?: Maybe<Patient>,
  fetchPatients?: Maybe<Array<Maybe<Patient>>>,
};


export type QueryFetchDoctorArgs = {
  id: Scalars['ID']
};


export type QueryFetchSpecialtyArgs = {
  id: Scalars['ID']
};


export type QueryFetchServiceArgs = {
  id: Scalars['ID']
};


export type QueryFetchScheduleArgs = {
  id: Scalars['ID']
};


export type QueryFetchPatientArgs = {
  id: Scalars['ID']
};

export type Schedule = {
   __typename?: 'Schedule',
  doctor?: Maybe<Doctor>,
  services?: Maybe<Array<Maybe<Service>>>,
  id: Scalars['ID'],
  name?: Maybe<Scalars['String']>,
  status?: Maybe<ScheduleStatus>,
  day?: Maybe<Scalars['String']>,
  value?: Maybe<Scalars['Float']>,
  color?: Maybe<Scalars['String']>,
  patient?: Maybe<Patient>,
};

export type ScheduleInput = {
  doctorId: Scalars['ID'],
  patientId: Scalars['ID'],
  name?: Maybe<Scalars['String']>,
  status?: Maybe<ScheduleStatus>,
  day: Scalars['String'],
  value?: Maybe<Scalars['Float']>,
  color?: Maybe<Scalars['String']>,
  services?: Maybe<Array<Maybe<Scalars['ID']>>>,
};

export enum ScheduleStatus {
  Agendado = 'AGENDADO',
  Atendendo = 'ATENDENDO',
  Concluido = 'CONCLUIDO',
  Cancelado = 'CANCELADO'
}

export type Service = {
   __typename?: 'Service',
  id: Scalars['ID'],
  code?: Maybe<Scalars['Int']>,
  name?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
  value?: Maybe<Scalars['Float']>,
  status?: Maybe<Scalars['Boolean']>,
};

export type ServiceInput = {
  id?: Maybe<Scalars['ID']>,
  name: Scalars['String'],
  code: Scalars['Int'],
  description?: Maybe<Scalars['String']>,
  value?: Maybe<Scalars['Float']>,
  status?: Maybe<Scalars['Boolean']>,
};

export type Specialty = {
   __typename?: 'Specialty',
  id: Scalars['ID'],
  code?: Maybe<Scalars['Int']>,
  name?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
};

export type SpecialtyInput = {
  id?: Maybe<Scalars['ID']>,
  code: Scalars['Int'],
  name?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
};

export type User = {
   __typename?: 'User',
  id: Scalars['ID'],
  name?: Maybe<Scalars['String']>,
  email?: Maybe<Scalars['String']>,
  createdAt?: Maybe<Scalars['String']>,
  updatedAt?: Maybe<Scalars['String']>,
};
