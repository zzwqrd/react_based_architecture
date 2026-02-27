// ─── Data Repository Implementation ────────────────────────────────────────
// Mirrors Flutter's auth/data/repositories_impl/repository_impl.dart

import AuthRepository from '../../domain/repositories/repository';
import LoginDataSource from '../datasources/remote_data_source';

class AuthRepositoryImpl extends AuthRepository {
  async completeLogin(params) {
    try {
      return await LoginDataSource.completeLogin(params);
    } catch (e) {
      throw e;
    }
  }
}

export default new AuthRepositoryImpl();
