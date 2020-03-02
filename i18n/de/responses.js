const responses = {
  add_domain: {
    200: 'Domain wurde erstellt',
    403: 'Domain ist bereits verifiziert',
    410: 'Domain wurde nicht erstellt oder konnte nicht gespeichert werden',
    422: 'Validierung fehlgeschlagen'
  },
  verify_domain: {
    200: 'Domain wurde verifiziert',
    403: 'Domain ist bereits verifiziert',
    404: 'Domain konnte nicht verifiziert werden',
    409: 'Es ist ein Fehler bei der Verifizierung aufgetreten',
    422: 'Validierung fehlgeschlagen'
  },
  list_domains: {
    200: 'Domains wurden zurückgegeben',
    403: 'Das SIWECOS-Token ist nicht gültig'
  },
  single_domain: {
    200: 'Die angefragt Domain wurde zurückgegeben',
    403: 'Das SIWECOS-Token ist nicht gültig',
    404: 'Domain nicht gefunden'
  },
  delete_domain: {
    200: 'Domain wurde gelöscht',
    403: 'Zugang verweigert',
    422: 'Validierung fehlgeschlagen'
  },
  scan: {
    200: 'Scan wurde gestartet',
    422: 'Validierung fehlgeschlagen'
  },
  scan_status: {
    200: 'Scan-Status erhalten',
    403: 'Zugang verweigert',
    404: 'Scan wurde nicht gefunden',
    422: 'Validierung fehlgeschlagen'
  },
  user_register: {
    200: 'Benutzer wurde erstellt',
    422: 'Validierung fehlgeschlagen'
  },
  resend_activation: {
    200: 'E-Mail wurde gesendet',
    410: 'Dieser Benutzer ist bereits aktiviert',
    422: 'Validierung fehlgeschlagen'
  },
  login: {
    200: 'Login erfolgreich',
    403: 'Falsche Zugangsdaten',
    406: 'Benutzer ist noch nicht aktiviert',
    422: 'Validierung fehlgeschlagen'
  },
  resend_password: {
    200: 'Eine E-Email wurde abgeschickt, sofern der Benutzer existiert',
    422: 'Validierung fehlgeschlagen'
  },
  reset_password: {
    200: 'Das Passwort wurde zurückgesetzt',
    422: 'Validierung fehlgeschlagen'
  },
  update_user: {
    200: 'Benutzerdaten aktualisiert',
    403: 'Das SIWECOS-Token ist nicht gültig',
    422: 'Validierung fehlgeschlagen, Mailadresse wird schon verwendet'
  },
  inputs: {
    email: {
      unique: 'Die E-Mail ist bereits vergeben'
    },
    domain: {
      hostname_invalid: 'Ungültige domain'
    }
  }
}

export default responses
