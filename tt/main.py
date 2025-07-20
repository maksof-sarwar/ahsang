from fastapi import FastAPI, Query
import re
import dns.resolver
import smtplib

app = FastAPI()

def is_valid_format(email: str) -> bool:
    return re.match(r"[^@]+@[^@]+\.[^@]+", email) is not None

def get_mx(domain: str):
    try:
        records = dns.resolver.resolve(domain, 'MX')
        return sorted(records, key=lambda r: r.preference)[0].exchange.to_text()
    except:
        return None

def smtp_check(email: str, mx_host: str):
    try:
        server = smtplib.SMTP(mx_host, 25, timeout=10)
        server.helo('example.com')
        server.mail('check@example.com')
        code, _ = server.rcpt(email)
        server.quit()
        return code == 250
    except:
        return False

@app.get("/verify")
def verify(email: str = Query(...)):
    if not is_valid_format(email):
        return { "email": email, "valid": False, "reason": "Invalid format" }

    domain = email.split("@")[1]
    mx = get_mx(domain)
    if not mx:
        return { "email": email, "valid": False, "reason": "No MX record found" }

    smtp_result = smtp_check(email, mx)
    return {
        "email": email,
        "valid": smtp_result,
        "mx_record_found": True,
        "smtp_verified": smtp_result,
        "reason": "SMTP verified" if smtp_result else "Mailbox not found or blocked"
    }
