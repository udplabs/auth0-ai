declare global {
  interface Factor {
    id?: string;
    enrolled?: boolean;
    type: FactorType;
    displayName?: string;
    createdAt?: string;
    enrolledAt?: string;
    lastAuthAt?: string;
  }

  type FactorType =
    | 'totp'
    | 'recovery-code'
    | 'sms'
    | 'push'
    | 'email'
    | 'push'
    | 'phone'
    | 'webauthn-roaming'
    | 'webauthn-platform'
    | 'passkey'
    | 'password';
}

export {};
