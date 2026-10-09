export interface TenantRequest extends Express.Request {
  tenantId?: string;
  schoolId?: string;
}

export interface TaskInput {
  title: string;
  description?: string;
  priority?: string;
  status?: string;
  dueAt?: Date;
}

export interface EventInput {
  title: string;
  description?: string;
  type?: string;
  status?: string;
  startsAt: Date;
  endsAt?: Date;
  location?: string;
}

export interface StudentInput {
  studentNumber: string;
  firstName: string;
  lastName: string;
  birthDate?: Date;
  gender?: string;
  status?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
