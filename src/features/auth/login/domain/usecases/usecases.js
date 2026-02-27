// ─── Domain Use Cases ──────────────────────────────────────────────────────
// Mirrors Flutter's auth/domain/usecases/login_usecase.dart

import authRepositoryImpl from '../../data/repositories_impl/repository_impl';

/**
 * CompleteLoginUseCase
 * Executes login and fetches user details.
 */
export const CompleteLoginUseCase = async (params) => {
  return await authRepositoryImpl.completeLogin(params);
};
