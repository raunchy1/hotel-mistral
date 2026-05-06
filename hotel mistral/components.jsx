// Hotel Mistral — componenti condivisi
const { useState, useEffect, useRef } = React;

// --- Helpers ---
function formatDate(d) {
  if (!d) return "";
  const date = new Date(d);
  return date.toLocaleDateString("it-IT", { day: "numeric", month: "short" });
}

function nightsBetween(a, b) {
  if (!a || !b) return 0;
  const ms = new Date(b) - new Date(a);
  return Math.max(0, Math.round(ms / (1000 * 60 * 60 * 24)));
}

function defaultDates() {
  const today = new Date();
  const inA = new Date(today); inA.setDate(today.getDate() + 14);
  const out = new Date(inA); out.setDate(inA.getDate() + 3);
  const fmt = (d) => d.toISOString().slice(0, 10);
  return { in: fmt(inA), out: fmt(out) };
}

// --- Nav ---
function Nav({ page, navigate, onBook }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <nav className={"nav " + (scrolled ? "scrolled" : "")}>
      <a href="#" className="nav-brand" onClick={(e)=>{e.preventDefault(); navigate("home")}}>
        Mistral
        <small>Alghero</small>
      </a>
      <div className="nav-links">
        <a href="#" className={page==="home"?"active":""} onClick={(e)=>{e.preventDefault(); navigate("home")}}>Hotel</a>
        <a href="#" className={page==="rooms"||page==="room"?"active":""} onClick={(e)=>{e.preventDefault(); navigate("rooms")}}>Camere</a>
        <a href="#esperienza" onClick={()=>navigate("home")}>Esperienza</a>
        <a href="#posizione" onClick={()=>navigate("home")}>Posizione</a>
        <a href="#contatti">Contatti</a>
      </div>
      <button className="nav-cta" onClick={onBook}>Verifica disponibilità</button>
    </nav>
  );
}

// --- Mobile sticky CTA ---
function MobileCTA({ onBook }) {
  return (
    <div className="mobile-cta">
      <div className="mobile-cta-price">
        <small>Da</small>
        €79 <span style={{fontSize:12,color:'var(--grigio)'}}>/notte</span>
      </div>
      <button className="btn btn-primary" onClick={onBook}>Verifica disponibilità</button>
    </div>
  );
}

// --- Booking bar inline (hero) ---
function BookingBar({ onSubmit }) {
  const dd = defaultDates();
  const [checkin, setCheckin] = useState(dd.in);
  const [checkout, setCheckout] = useState(dd.out);
  const [guests, setGuests] = useState(2);

  return (
    <div className="booking-bar">
      <label className="booking-field">
        <span style={{fontSize:10,letterSpacing:'0.14em',textTransform:'uppercase',color:'var(--grigio)'}}>Check-in</span>
        <input type="date" value={checkin} onChange={(e)=>setCheckin(e.target.value)} />
      </label>
      <label className="booking-field">
        <span style={{fontSize:10,letterSpacing:'0.14em',textTransform:'uppercase',color:'var(--grigio)'}}>Check-out</span>
        <input type="date" value={checkout} onChange={(e)=>setCheckout(e.target.value)} min={checkin} />
      </label>
      <label className="booking-field">
        <span style={{fontSize:10,letterSpacing:'0.14em',textTransform:'uppercase',color:'var(--grigio)'}}>Ospiti</span>
        <select value={guests} onChange={(e)=>setGuests(+e.target.value)} style={{border:'none',background:'none',fontFamily:'var(--serif)',fontSize:17,outline:'none',padding:0,color:'var(--antracite)'}}>
          <option value={1}>1 ospite</option>
          <option value={2}>2 ospiti</option>
          <option value={3}>3 ospiti</option>
          <option value={4}>4 ospiti</option>
        </select>
      </label>
      <button className="booking-submit" onClick={()=>onSubmit({checkin, checkout, guests})}>
        Cerca <span>→</span>
      </button>
    </div>
  );
}

// --- Booking Modal ---
function BookingModal({ open, onClose, room, prefill }) {
  const dd = defaultDates();
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    checkin: prefill?.checkin || dd.in,
    checkout: prefill?.checkout || dd.out,
    guests: prefill?.guests || 2,
    roomId: room?.id || "matrimoniale-balcone",
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  useEffect(() => {
    if (open) {
      setStep(1);
      setData(d => ({
        ...d,
        roomId: room?.id || d.roomId,
        checkin: prefill?.checkin || d.checkin,
        checkout: prefill?.checkout || d.checkout,
        guests: prefill?.guests || d.guests,
      }));
    }
  }, [open, room, prefill]);

  if (!open) return null;

  const selectedRoom = window.ROOMS.find(r => r.id === data.roomId) || window.ROOMS[0];
  const nights = nightsBetween(data.checkin, data.checkout);
  const subtotal = nights * selectedRoom.price;
  const breakfast = nights * 10 * data.guests;
  const cityTax = nights * 2 * data.guests;

  const update = (k, v) => setData({ ...data, [k]: v });

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e)=>e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>

        {step === 1 && (
          <>
            <div style={{fontSize:11,letterSpacing:'0.16em',textTransform:'uppercase',color:'var(--grigio)',marginBottom:12}}>Passo 1 di 2</div>
            <h3 className="serif">Quando vuoi venire?</h3>
            <p className="muted small" style={{marginTop:8}}>Verifichiamo la disponibilità in tempo reale.</p>

            <div className="modal-section">
              <div className="modal-row">
                <div>
                  <label style={{fontSize:11,color:'var(--grigio)',display:'block',marginBottom:6,letterSpacing:'0.1em',textTransform:'uppercase'}}>Check-in</label>
                  <input type="date" value={data.checkin} onChange={(e)=>update("checkin", e.target.value)} />
                </div>
                <div>
                  <label style={{fontSize:11,color:'var(--grigio)',display:'block',marginBottom:6,letterSpacing:'0.1em',textTransform:'uppercase'}}>Check-out</label>
                  <input type="date" value={data.checkout} onChange={(e)=>update("checkout", e.target.value)} min={data.checkin} />
                </div>
              </div>
            </div>

            <div className="modal-section">
              <h4>Ospiti</h4>
              <select value={data.guests} onChange={(e)=>update("guests", +e.target.value)}>
                {[1,2,3,4].map(n=>(<option key={n} value={n}>{n} {n===1?"ospite":"ospiti"}</option>))}
              </select>
            </div>

            <div className="modal-section">
              <h4>Camera</h4>
              <div style={{display:'flex',flexDirection:'column',gap:8}}>
                {window.ROOMS.map(r => (
                  <label key={r.id} style={{
                    display:'flex',justifyContent:'space-between',alignItems:'center',
                    padding:'14px 16px',
                    border: '1px solid ' + (data.roomId===r.id ? 'var(--antracite)' : 'var(--beige-scuro)'),
                    cursor:'pointer',
                    background: data.roomId===r.id ? 'var(--beige)' : 'transparent',
                    transition:'all 150ms ease'
                  }}>
                    <input type="radio" name="room" checked={data.roomId===r.id} onChange={()=>update("roomId", r.id)} style={{display:'none'}} />
                    <div>
                      <div style={{fontFamily:'var(--serif)',fontSize:17}}>{r.name}</div>
                      <div style={{fontSize:12,color:'var(--grigio)',marginTop:2}}>{r.guests} ospiti · {r.size}m²</div>
                    </div>
                    <div style={{fontFamily:'var(--serif)',fontSize:20}}>€{r.price}<span style={{fontSize:12,color:'var(--grigio)'}}>/notte</span></div>
                  </label>
                ))}
              </div>
            </div>

            {nights > 0 && (
              <div className="summary">
                <div className="summary-line"><span>{selectedRoom.name}</span><span>€{selectedRoom.price} × {nights}</span></div>
                <div className="summary-line"><span className="muted">Soggiorno</span><span>€{subtotal}</span></div>
                <div className="summary-line"><span className="muted">Tassa di soggiorno</span><span>€{cityTax}</span></div>
                <div className="summary-total"><span>Totale</span><span>€{subtotal + cityTax}</span></div>
                <div style={{fontSize:11,color:'var(--grigio)',marginTop:8}}>Colazione opzionale +€{breakfast} · Nessun pagamento anticipato</div>
              </div>
            )}

            <button className="btn btn-primary" style={{width:'100%',justifyContent:'center',padding:18,marginTop:8}} onClick={()=>setStep(2)} disabled={nights<1}>
              Continua <span>→</span>
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <div style={{fontSize:11,letterSpacing:'0.16em',textTransform:'uppercase',color:'var(--grigio)',marginBottom:12}}>Passo 2 di 2</div>
            <h3 className="serif">I tuoi dati</h3>
            <p className="muted small" style={{marginTop:8}}>Riceverai conferma immediata via email. Nessun addebito ora.</p>

            <div className="modal-section">
              <div style={{display:'flex',flexDirection:'column',gap:12}}>
                <div>
                  <label style={{fontSize:11,color:'var(--grigio)',display:'block',marginBottom:6,letterSpacing:'0.1em',textTransform:'uppercase'}}>Nome e cognome</label>
                  <input type="text" value={data.name} onChange={(e)=>update("name", e.target.value)} placeholder="Mario Rossi" />
                </div>
                <div className="modal-row">
                  <div>
                    <label style={{fontSize:11,color:'var(--grigio)',display:'block',marginBottom:6,letterSpacing:'0.1em',textTransform:'uppercase'}}>Email</label>
                    <input type="email" value={data.email} onChange={(e)=>update("email", e.target.value)} placeholder="mario@esempio.it" />
                  </div>
                  <div>
                    <label style={{fontSize:11,color:'var(--grigio)',display:'block',marginBottom:6,letterSpacing:'0.1em',textTransform:'uppercase'}}>Telefono</label>
                    <input type="tel" value={data.phone} onChange={(e)=>update("phone", e.target.value)} placeholder="+39..." />
                  </div>
                </div>
                <div>
                  <label style={{fontSize:11,color:'var(--grigio)',display:'block',marginBottom:6,letterSpacing:'0.1em',textTransform:'uppercase'}}>Note (opzionale)</label>
                  <input type="text" value={data.notes} onChange={(e)=>update("notes", e.target.value)} placeholder="Arrivo tardi, allergie, richieste..." />
                </div>
              </div>
            </div>

            <div className="summary">
              <div className="summary-line"><span className="muted">Camera</span><span>{selectedRoom.name}</span></div>
              <div className="summary-line"><span className="muted">Date</span><span>{formatDate(data.checkin)} → {formatDate(data.checkout)}</span></div>
              <div className="summary-line"><span className="muted">Ospiti</span><span>{data.guests}</span></div>
              <div className="summary-total"><span>Totale</span><span>€{subtotal + cityTax}</span></div>
            </div>

            <div style={{display:'flex',gap:12}}>
              <button className="btn btn-ghost" onClick={()=>setStep(1)} style={{flex:'0 0 auto'}}>← Indietro</button>
              <button className="btn btn-primary" style={{flex:1,justifyContent:'center',padding:18}} onClick={()=>setStep(3)} disabled={!data.name || !data.email}>
                Conferma prenotazione <span>→</span>
              </button>
            </div>
            <div style={{fontSize:11,color:'var(--grigio)',marginTop:16,textAlign:'center'}}>
              Cancellazione gratuita fino a 48h prima · Nessun pagamento anticipato
            </div>
          </>
        )}

        {step === 3 && (
          <div style={{textAlign:'center',padding:'20px 0'}}>
            <div style={{
              width:64, height:64, borderRadius:'50%',
              background:'var(--beige)', margin:'0 auto 24px',
              display:'flex',alignItems:'center',justifyContent:'center',
              fontFamily:'var(--serif)', fontSize:32
            }}>✓</div>
            <h3 className="serif" style={{marginBottom:12}}>Prenotazione ricevuta</h3>
            <p style={{maxWidth:'40ch',margin:'0 auto',color:'var(--grigio)',fontSize:15,lineHeight:1.6}}>
              Ti abbiamo inviato la conferma a <b style={{color:'var(--antracite)'}}>{data.email}</b>.
              Ci vediamo il <b style={{color:'var(--antracite)'}}>{formatDate(data.checkin)}</b>.
            </p>
            <div className="summary" style={{textAlign:'left',marginTop:32}}>
              <div className="summary-line"><span className="muted">Codice prenotazione</span><span style={{fontFamily:'var(--mono)'}}>MIS-{Math.floor(Math.random()*900000)+100000}</span></div>
              <div className="summary-line"><span className="muted">{selectedRoom.name}</span><span>{nights} {nights===1?"notte":"notti"}</span></div>
              <div className="summary-total"><span>Totale</span><span>€{subtotal + cityTax}</span></div>
            </div>
            <button className="btn btn-primary" style={{marginTop:24}} onClick={onClose}>Chiudi</button>
          </div>
        )}
      </div>
    </div>
  );
}

// --- Footer ---
function Footer() {
  return (
    <footer className="footer" id="contatti">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="brand-mark">Hotel Mistral</div>
            <p style={{maxWidth:'32ch',color:'var(--grigio-chiaro)'}}>
              Un hotel a gestione familiare ad Alghero, Sardegna. Tre stelle, venticinque camere, quarant'anni di accoglienza.
            </p>
          </div>
          <div>
            <h4>Contatti</h4>
            <ul>
              <li>Via dei Pini 12</li>
              <li>07041 Alghero (SS)</li>
              <li style={{marginTop:12}}>+39 079 950 123</li>
              <li>info@hotelmistral.it</li>
            </ul>
          </div>
          <div>
            <h4>Reception</h4>
            <ul>
              <li>Aperta 7—23</li>
              <li>Check-in dalle 14:00</li>
              <li>Check-out entro le 11:00</li>
            </ul>
          </div>
          <div>
            <h4>Seguici</h4>
            <ul>
              <li>Instagram</li>
              <li>Facebook</li>
              <li>Tripadvisor</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Hotel Mistral · P.IVA 01234567890</span>
          <span>Privacy · Cookie · Termini</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Nav, MobileCTA, BookingBar, BookingModal, Footer, formatDate, nightsBetween, defaultDates });
