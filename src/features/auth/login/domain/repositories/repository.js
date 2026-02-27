// ─── Domain Repository Interface ───────────────────────────────────────────
// Mirrors Flutter's auth/domain/repositories/repository.dart

class AuthRepository {
  /**
   * Executes complete login flow (token -> customer details).
   * @param {Object} params - { email, password }
   * @returns {Promise<Object>} { isSuccess, message, data: { token, customer } }
   */
  async completeLogin(params) {
    throw new Error('Not implemented');
  }
}

export default AuthRepository;
