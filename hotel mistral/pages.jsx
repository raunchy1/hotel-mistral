// Hotel Mistral — pagine

function HomePage({ navigate, onBook, onBookRoom }) {
  return (
    <div className="page">
      {/* HERO */}
      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-left">
              <div className="eyebrow" style={{marginBottom: 28}}>Alghero, Sardegna · Dal 1984</div>
              <h1 className="h-display serif">
                Mattine piene di luce, <span className="italic">comfort discreto</span><br/>
                e il profumo del mare.
              </h1>
              <div className="hero-meta">
                <span><span className="price-from italic">Da</span> <b style={{fontFamily:'var(--serif)',fontSize:22,color:'var(--antracite)'}}>€79</b> a notte</span>
                <span>700m dalla spiaggia</span>
                <span>Parcheggio gratuito</span>
                <span>WiFi incluso</span>
              </div>
              <BookingBar onSubmit={onBook} />
              <div style={{marginTop:20,fontSize:12,color:'var(--grigio)'}}>
                <span className="tag-good">● Prezzo migliore garantito</span>
                <span style={{margin:'0 12px'}}>·</span>
                Nessun pagamento anticipato
              </div>
            </div>

            <div className="hero-image">
              <image-slot id="hero" placeholder="Foto principale — facciata o vista mare al tramonto" shape="rect"></image-slot>
              <div className="hero-caption">Veranda al mattino, ottobre</div>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="section" id="hotel">
        <div className="container">
          <div className="intro-grid">
            <div>
              <div className="section-num">— 01 / L'hotel</div>
              <h2 className="h-medium serif italic" style={{marginTop:24,maxWidth:'10ch'}}>
                Fatto<br/>semplicemente<br/>bene.
              </h2>
            </div>
            <div className="intro-body">
              <p className="serif">
                Hotel Mistral si trova appena fuori dal centro di Alghero, dove il ritmo rallenta e l'aria profuma di pini e mare.
              </p>
              <p>
                Una palazzina di tre piani, venticinque camere, una famiglia che lo gestisce da quarant'anni. Niente eccessi. Solo ciò che conta: camere pulite, una buona colazione, e un'accoglienza sincera.
              </p>
              <p style={{color:'var(--grigio)'}}>
                Non è un hotel di lusso, e non finge di esserlo. È un buon hotel, fatto bene, a un prezzo onesto.
              </p>

              <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:24,marginTop:48,paddingTop:32,borderTop:'1px solid var(--beige-scuro)'}}>
                <div><div className="serif" style={{fontSize:32}}>25</div><div className="tiny muted">Camere</div></div>
                <div><div className="serif" style={{fontSize:32}}>3</div><div className="tiny muted">Stelle</div></div>
                <div><div className="serif" style={{fontSize:32}}>40</div><div className="tiny muted">Anni</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CAMERE */}
      <section className="section" id="camere" style={{background:'var(--beige)'}}>
        <div className="container">
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'end',marginBottom:64,gap:24,flexWrap:'wrap'}}>
            <div>
              <div className="section-num">— 02 / Le camere</div>
              <h2 className="h-large serif" style={{marginTop:16,maxWidth:'14ch'}}>
                Tre camere, una <span className="italic">sola idea</span> di comfort.
              </h2>
            </div>
            <a href="#" className="btn btn-ghost btn-arrow" onClick={(e)=>{e.preventDefault(); navigate("rooms")}}>Vedi tutte le camere</a>
          </div>

          <div className="rooms-grid">
            {window.ROOMS.map((r) => (
              <div key={r.id} className="room-card" onClick={()=>navigate("room", r.id)}>
                <div className="img-wrap">
                  <image-slot id={"room-"+r.id} placeholder={"Foto: " + r.name} shape="rect"></image-slot>
                </div>
                {r.badge && (
                  <div style={{marginBottom:8}}>
                    <span className={r.available <= 2 ? "tag-scarce" : "tag-good"}>{r.available <= 2 ? "● " : "● "}{r.badge}</span>
                  </div>
                )}
                <div className="meta-line">
                  <h3 className="serif">{r.name}</h3>
                </div>
                <div className="specs">{r.guests} ospiti · {r.size}m² · {r.beds}</div>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginTop:16}}>
                  <div className="from">Da <b>€{r.price}</b> <span style={{fontSize:13,color:'var(--grigio)'}}>/notte</span></div>
                  <span className="btn-arrow" style={{fontSize:14}}>Dettagli</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ESPERIENZA */}
      <section className="section" id="esperienza">
        <div className="container">
          <div className="exp-grid">
            <div className="exp-image">
              <image-slot id="experience" placeholder="Foto colazione in veranda — luce naturale, vista giardino" shape="rect"></image-slot>
            </div>
            <div className="exp-text">
              <div className="section-num">— 03 / Il soggiorno</div>
              <h2 className="h-large serif" style={{marginTop:16,marginBottom:32}}>
                Mattine lente,<br/><span className="italic">giornate aperte.</span>
              </h2>
              <p>
                La colazione viene servita in veranda, tra luce naturale e prodotti freschi. Pane del forno qui sotto, formaggi locali, frutta di stagione, caffè vero.
              </p>
              <p>
                Da lì, la giornata è tua. Mare a piedi in dieci minuti, centro storico in otto in auto, oppure semplicemente il giardino e una sedia all'ombra.
              </p>

              <div style={{marginTop:48}}>
                <div className="tiny muted" style={{marginBottom:20}}>Servizi inclusi</div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px 32px'}}>
                  {window.SERVICES.map((s, i) => (
                    <div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',paddingBottom:8,borderBottom:'1px solid var(--beige-scuro)'}}>
                      <span style={{fontSize:14}}>{s.label}</span>
                      <span style={{fontSize:11,color:'var(--grigio)',letterSpacing:'0.04em'}}>{s.note}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RECENSIONI */}
      <section className="section reviews">
        <div className="container">
          <div className="reviews-grid">
            <div>
              <div className="section-num">— 04 / Recensioni</div>
              <div className="score-block" style={{marginTop:24}}>
                <div className="score">{window.HOTEL.rating}</div>
                <div className="score-side">
                  <strong>Ottimo</strong>
                  <small>{window.HOTEL.reviewCount} recensioni</small>
                </div>
              </div>
              <p className="muted small" style={{marginTop:24,maxWidth:'30ch'}}>
                Punteggio medio basato su Booking.com, Tripadvisor e Google.
              </p>
            </div>

            <div>
              <ReviewCarousel />

              <div className="highlights">
                {window.HIGHLIGHTS.map((h, i) => (
                  <div key={i} className="highlight">
                    <strong>{h.score} <span style={{fontSize:14,color:'var(--grigio)',fontStyle:'italic',marginLeft:4}}>/ 10</span></strong>
                    <span style={{display:'block',fontSize:14,color:'var(--antracite)',marginBottom:4}}>{h.label}</span>
                    <span>{h.note}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* POSIZIONE */}
      <section className="section" id="posizione">
        <div className="container">
          <div style={{marginBottom:64}}>
            <div className="section-num">— 05 / Posizione</div>
            <h2 className="h-large serif" style={{marginTop:16,maxWidth:'18ch'}}>
              Vicino a quello che conta. <span className="italic">Lontano dal rumore.</span>
            </h2>
          </div>

          <div className="location-grid">
            <ul className="distance-list">
              {window.DISTANCES.map((d, i) => (
                <li key={i}>
                  <span className="km">{d.km}<span style={{fontSize:14,color:'var(--grigio)',marginLeft:2}}>{d.unit}</span></span>
                  <span className="place">{d.place}</span>
                  <span className="meta">{d.meta}</span>
                </li>
              ))}
            </ul>

            <div className="map-wrap">
              <SimpleMap />
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINALE */}
      <section className="cta-final" style={{background:'var(--beige)'}}>
        <div className="container">
          <div className="section-num">— 06</div>
          <h2 className="h-large serif" style={{marginTop:24}}>
            Il tuo soggiorno ad Alghero <span className="italic">inizia qui.</span>
          </h2>
          <div className="meta">
            <b style={{fontFamily:'var(--serif)',fontSize:24,color:'var(--antracite)'}}>Da €79</b> a notte
            <span style={{margin:'0 16px'}}>·</span>
            Parcheggio gratuito
            <span style={{margin:'0 16px'}}>·</span>
            Nessun pagamento anticipato
          </div>
          <button className="btn btn-primary btn-arrow" onClick={onBook} style={{padding:'20px 36px',fontSize:15}}>
            Verifica disponibilità
          </button>
        </div>
      </section>
    </div>
  );
}

function ReviewCarousel() {
  const [i, setI] = useState(0);
  const r = window.REVIEWS[i];
  return (
    <div>
      <div className="review-quote">"{r.quote}"</div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:20,flexWrap:'wrap'}}>
        <div className="review-attr">
          <b style={{color:'var(--antracite)',fontFamily:'var(--serif)',fontSize:16,fontWeight:400,fontStyle:'italic'}}>{r.author}</b>
          <span style={{margin:'0 10px',color:'var(--grigio-chiaro)'}}>·</span>
          {r.origin}
          <span style={{margin:'0 10px',color:'var(--grigio-chiaro)'}}>·</span>
          {r.when}
        </div>
        <div style={{display:'flex',gap:8,alignItems:'center'}}>
          <button onClick={()=>setI((i-1+window.REVIEWS.length)%window.REVIEWS.length)} style={{width:40,height:40,border:'1px solid var(--beige-scuro)',background:'var(--bianco)'}}>←</button>
          <span className="muted small">{i+1} / {window.REVIEWS.length}</span>
          <button onClick={()=>setI((i+1)%window.REVIEWS.length)} style={{width:40,height:40,border:'1px solid var(--beige-scuro)',background:'var(--bianco)'}}>→</button>
        </div>
      </div>
    </div>
  );
}

function SimpleMap() {
  // Mappa stilizzata SVG — Alghero costa, hotel + punti di interesse
  return (
    <svg viewBox="0 0 400 500" style={{width:'100%',height:'100%',display:'block'}}>
      <defs>
        <pattern id="grain" x="0" y="0" width="3" height="3" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.3" fill="#8A8279" opacity="0.15" />
        </pattern>
      </defs>
      <rect width="400" height="500" fill="#E8E0D4" />
      <rect width="400" height="500" fill="url(#grain)" />

      {/* Mare */}
      <path d="M 0,0 L 0,250 Q 80,260 160,240 Q 200,230 240,250 Q 280,270 320,255 Q 360,240 400,260 L 400,0 Z" fill="#C8D5DA" opacity="0.7" />
      <text x="40" y="80" fontFamily="Cormorant Garamond, serif" fontSize="18" fontStyle="italic" fill="#6B7C85">Mar di Sardegna</text>

      {/* Strade */}
      <path d="M 0,310 Q 100,300 200,320 Q 300,340 400,315" stroke="#D9CFBF" strokeWidth="1.5" fill="none" />
      <path d="M 180,500 Q 200,400 220,290" stroke="#D9CFBF" strokeWidth="1.5" fill="none" />
      <path d="M 50,500 Q 120,400 200,320" stroke="#D9CFBF" strokeWidth="1.5" fill="none" />

      {/* Spiaggia Maria Pia */}
      <circle cx="120" cy="245" r="4" fill="#8A8279" />
      <text x="130" y="240" fontFamily="Inter, sans-serif" fontSize="10" letterSpacing="0.1em" textTransform="uppercase" fill="#2C2C2C">SPIAGGIA MARIA PIA</text>
      <text x="130" y="254" fontFamily="Cormorant Garamond, serif" fontSize="11" fontStyle="italic" fill="#8A8279">700 m</text>

      {/* Hotel */}
      <circle cx="200" cy="320" r="8" fill="#2C2C2C" />
      <circle cx="200" cy="320" r="14" fill="none" stroke="#2C2C2C" strokeWidth="1" opacity="0.4" />
      <circle cx="200" cy="320" r="22" fill="none" stroke="#2C2C2C" strokeWidth="1" opacity="0.2" />
      <text x="215" y="318" fontFamily="Cormorant Garamond, serif" fontSize="16" fill="#2C2C2C" fontStyle="italic">Hotel Mistral</text>
      <text x="215" y="332" fontFamily="Inter, sans-serif" fontSize="9" letterSpacing="0.12em" fill="#8A8279">VIA DEI PINI 12</text>

      {/* Centro storico */}
      <circle cx="320" cy="420" r="4" fill="#8A8279" />
      <text x="240" y="440" fontFamily="Inter, sans-serif" fontSize="10" letterSpacing="0.1em" fill="#2C2C2C">CENTRO STORICO</text>
      <text x="240" y="454" fontFamily="Cormorant Garamond, serif" fontSize="11" fontStyle="italic" fill="#8A8279">2.5 km · 8 min auto</text>

      {/* Aeroporto */}
      <circle cx="60" cy="460" r="4" fill="#8A8279" />
      <text x="20" y="480" fontFamily="Inter, sans-serif" fontSize="10" letterSpacing="0.1em" fill="#2C2C2C">AEROPORTO</text>
      <text x="20" y="494" fontFamily="Cormorant Garamond, serif" fontSize="11" fontStyle="italic" fill="#8A8279">6 km</text>

      {/* Compass */}
      <g transform="translate(360, 40)">
        <circle r="14" fill="none" stroke="#8A8279" strokeWidth="0.5" />
        <text textAnchor="middle" y="-16" fontFamily="Inter, sans-serif" fontSize="9" fill="#8A8279">N</text>
        <line y1="-10" y2="10" stroke="#2C2C2C" strokeWidth="0.5" />
      </g>
    </svg>
  );
}

// --- ROOMS LIST PAGE ---
function RoomsPage({ navigate, onBookRoom }) {
  return (
    <div className="page">
      <section className="page-header">
        <div className="container">
          <div className="section-num">Camere</div>
          <h1 className="h-large serif" style={{marginTop:16}}>
            Tre tipologie. <span className="italic">Stessa cura.</span>
          </h1>
          <p style={{marginTop:20}}>
            Tutte le camere hanno aria condizionata, bagno privato, WiFi gratuito e l'essenziale per dormire bene. Cambia solo lo spazio.
          </p>
        </div>
      </section>

      <section className="rooms-list">
        <div className="container">
          {window.ROOMS.map((r, idx) => (
            <article key={r.id} className="room-row">
              <div className="img-wrap" onClick={()=>navigate("room", r.id)} style={{cursor:'pointer'}}>
                <image-slot id={"roomlist-"+r.id} placeholder={"Foto: " + r.name} shape="rect"></image-slot>
              </div>
              <div className="info">
                <div>
                  <div style={{display:'flex',gap:16,alignItems:'center',marginBottom:12}}>
                    <span className="tiny muted">— 0{idx+1} —</span>
                    {r.badge && <span className={r.available <= 2 ? "tag-scarce" : "tag-good"}>● {r.badge}</span>}
                  </div>
                  <h2 className="h-medium serif" onClick={()=>navigate("room", r.id)} style={{cursor:'pointer',marginBottom:16}}>{r.name}</h2>
                  <div className="specs-row">
                    <span>{r.guests} ospiti</span>
                    <span>{r.size}m²</span>
                    <span>{r.beds}</span>
                    <span>{r.view}</span>
                  </div>
                  <p style={{maxWidth:'52ch',color:'var(--grigio)',marginBottom:24,lineHeight:1.6}}>{r.desc}</p>
                  <div className="amenities">
                    {r.amenities.slice(0,5).map((a,i)=>(<span key={i} className="amenity">{a}</span>))}
                    {r.amenities.length > 5 && <span className="amenity" style={{opacity:0.6}}>+{r.amenities.length - 5}</span>}
                  </div>
                </div>

                <div className="price-cta">
                  <div>
                    <div className="price-from">Da</div>
                    <div><span className="price-num-lg">€{r.price}</span> <span className="price-night">/notte</span></div>
                  </div>
                  <div style={{display:'flex',gap:12}}>
                    <button className="btn btn-ghost" onClick={()=>navigate("room", r.id)}>Dettagli</button>
                    <button className="btn btn-primary btn-arrow" onClick={()=>onBookRoom(r)}>Prenota</button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

// --- ROOM DETAIL PAGE ---
function RoomDetailPage({ roomId, navigate, onBookRoom }) {
  const room = window.ROOMS.find(r => r.id === roomId) || window.ROOMS[0];
  const dd = defaultDates();
  const [checkin, setCheckin] = useState(dd.in);
  const [checkout, setCheckout] = useState(dd.out);
  const [guests, setGuests] = useState(2);

  const nights = nightsBetween(checkin, checkout);
  const total = nights * room.price;

  return (
    <div className="page room-detail">
      <div className="container">
        <div style={{paddingTop:32,paddingBottom:32,fontSize:13,color:'var(--grigio)'}}>
          <a href="#" onClick={(e)=>{e.preventDefault(); navigate("home")}}>Hotel</a>
          <span style={{margin:'0 8px'}}>/</span>
          <a href="#" onClick={(e)=>{e.preventDefault(); navigate("rooms")}}>Camere</a>
          <span style={{margin:'0 8px'}}>/</span>
          <span style={{color:'var(--antracite)'}}>{room.name}</span>
        </div>

        <div className="gallery">
          <image-slot id={"detail-"+room.id+"-1"} placeholder="Foto principale camera" shape="rect"></image-slot>
          <image-slot id={"detail-"+room.id+"-2"} placeholder="Letto" shape="rect"></image-slot>
          <image-slot id={"detail-"+room.id+"-3"} placeholder="Bagno" shape="rect"></image-slot>
          <image-slot id={"detail-"+room.id+"-4"} placeholder="Balcone o vista" shape="rect"></image-slot>
          <image-slot id={"detail-"+room.id+"-5"} placeholder="Dettaglio" shape="rect"></image-slot>
        </div>

        <div className="detail-grid">
          <div className="detail-main">
            {room.badge && (
              <div style={{marginBottom:16}}>
                <span className={room.available <= 2 ? "tag-scarce" : "tag-good"}>● {room.badge}{room.available <= 2 ? ` — ${room.available} rimaste per le tue date` : ""}</span>
              </div>
            )}
            <h1 className="h-large serif">{room.name}</h1>

            <div className="detail-specs">
              <div><strong>{room.guests}</strong><small>Ospiti</small></div>
              <div><strong>{room.size} m²</strong><small>Spazio</small></div>
              <div><strong style={{fontSize:17}}>{room.beds}</strong><small>Letto</small></div>
              <div><strong style={{fontSize:17}}>{room.view}</strong><small>Vista</small></div>
            </div>

            <div className="detail-desc">
              <p>{room.desc}</p>
              <p style={{color:'var(--grigio)'}}>
                Pulizia giornaliera, biancheria cambiata ogni due giorni, prodotti per il bagno inclusi. La reception è a pochi passi e il personale parla italiano, inglese e francese.
              </p>
            </div>

            <div style={{marginTop:64}}>
              <div className="tiny muted" style={{marginBottom:20}}>In camera</div>
              <div className="amenities-grid">
                {room.amenities.map((a, i) => (
                  <div key={i} className="amenity-line">{a}</div>
                ))}
              </div>
            </div>

            <div style={{marginTop:64,padding:'40px',background:'var(--beige)'}}>
              <h3 className="h-small serif" style={{marginBottom:16}}>Politica flessibile</h3>
              <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:24}}>
                <div>
                  <div className="tiny muted" style={{marginBottom:6}}>Cancellazione</div>
                  <div style={{fontSize:15}}>Gratuita fino a 48h prima dell'arrivo.</div>
                </div>
                <div>
                  <div className="tiny muted" style={{marginBottom:6}}>Pagamento</div>
                  <div style={{fontSize:15}}>Nessun addebito ora. Paghi all'arrivo.</div>
                </div>
                <div>
                  <div className="tiny muted" style={{marginBottom:6}}>Check-in</div>
                  <div style={{fontSize:15}}>Dalle 14:00 alle 23:00.</div>
                </div>
                <div>
                  <div className="tiny muted" style={{marginBottom:6}}>Check-out</div>
                  <div style={{fontSize:15}}>Entro le 11:00.</div>
                </div>
              </div>
            </div>
          </div>

          <aside className="booking-card">
            <div className="tiny muted" style={{marginBottom:8}}>Prenota questa camera</div>
            <h3 className="serif">{room.name}</h3>
            <div className="price-line">
              <span className="price-num-lg" style={{fontSize:42}}>€{room.price}</span>
              <span className="price-night">/notte</span>
            </div>

            <div className="field">
              <label>Check-in</label>
              <input type="date" value={checkin} onChange={(e)=>setCheckin(e.target.value)} />
            </div>
            <div className="field">
              <label>Check-out</label>
              <input type="date" value={checkout} onChange={(e)=>setCheckout(e.target.value)} min={checkin} />
            </div>
            <div className="field">
              <label>Ospiti</label>
              <select value={guests} onChange={(e)=>setGuests(+e.target.value)} style={{border:'none',background:'none',fontFamily:'var(--serif)',fontSize:17,outline:'none',padding:0,width:'100%'}}>
                {[...Array(room.guests)].map((_,i)=>(<option key={i+1} value={i+1}>{i+1} {i===0?"ospite":"ospiti"}</option>))}
              </select>
            </div>

            {nights > 0 && (
              <div style={{padding:'20px 0',borderBottom:'1px solid var(--beige-scuro)'}}>
                <div className="summary-line"><span className="muted">€{room.price} × {nights} {nights===1?"notte":"notti"}</span><span>€{total}</span></div>
                <div style={{display:'flex',justifyContent:'space-between',marginTop:12,fontFamily:'var(--serif)',fontSize:20}}>
                  <span>Totale</span><span>€{total}</span>
                </div>
              </div>
            )}

            <button className="btn btn-primary btn-arrow" onClick={()=>onBookRoom(room, {checkin, checkout, guests})}>
              Verifica disponibilità
            </button>

            <div className="reassure">
              Cancellazione gratuita fino a 48h prima<br/>
              Nessun pagamento anticipato
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { HomePage, RoomsPage, RoomDetailPage });
