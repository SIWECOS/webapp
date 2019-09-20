const responses = {
  add_domain: {
    200: 'Domain created',
    403: 'Domain is already verified',
    410: 'Domain was not created or could not be saved',
    422: 'Validation failed'
  },
  verify_domain: {
    200: 'Domain verified',
    403: 'Domain is already verified',
    404: 'Domain could not be verified',
    409: 'Domain verification exception',
    422: 'Validation failed'
  },
  list_domains: {
    200: 'List of domains returned',
    403: 'SIWECOS-Token not valid'
  },
  single_domain: {
    200: 'Domain details returned',
    403: 'SIWECOS-Token not valid',
    404: 'Domain not found'
  },
  delete_domain: {
    200: 'Domain deleted',
    403: 'Forbidden',
    422: 'Validation failed'
  },
  scan: {
    200: 'Scan started',
    422: 'Validation failed'
  },
  scan_status: {
    200: 'Scan status retrieved',
    403: 'Forbidden',
    404: 'Scan not found',
    422: 'Validation failed'
  },
  user_register: {
    200: 'User created',
    422: 'Validation failed'
  },
  resend_activation: {
    200: 'Mail sent',
    410: 'User already activated',
    422: 'Validation failed'
  },
  login: {
    200: 'User logged in',
    403: 'Wrong credentials',
    406: 'User not activated',
    422: 'Validation failed'
  },
  resend_password: {
    200: 'Password-Reset email was sent if the activated user exists in the database',
    422: 'Validation failed'
  },
  update_user: {
    200: 'User updated',
    403: 'SIWECOS-Token not valid',
    422: 'Validation failed'
  },
  inputs: {
    email: {
      unique: 'Email already in use'
    }
  }
}

export default responses
