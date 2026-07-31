(function(){
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* header condenses on scroll — §6.8 */
  var hdr = document.getElementById('hdr');
  var onScroll = function(){ hdr.classList.toggle('stuck', window.scrollY > 40); };
  onScroll(); window.addEventListener('scroll', onScroll, {passive:true});

  /* mobile menu */
  var burger = document.getElementById('burger');
  burger.addEventListener('click', function(){
    var open = document.body.classList.toggle('navopen');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  document.querySelectorAll('.mobnav a').forEach(function(a){
    a.addEventListener('click', function(){
      document.body.classList.remove('navopen');
      burger.setAttribute('aria-expanded','false');
    });
  });

  /* scroll reveals + section state changes */
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
    }, {rootMargin:'0px 0px -12% 0px', threshold:.12});
    document.querySelectorAll('.io, #proc, #lifecycle, #thermal').forEach(function(el){ io.observe(el); });
  } else {
    document.querySelectorAll('.io, #proc, #lifecycle, #thermal').forEach(function(el){ el.classList.add('in'); });
  }

  /* hero status readout: warning → stable, once. §6.1.7 */
  var status = document.getElementById('status');
  if (status) {
    var toStable = function(){
      status.classList.add('ok');
      status.querySelector('.hd .mono').textContent = 'Cooling restored';
    };
    reduce ? toStable() : setTimeout(toStable, 2600);
  }

  /* equipment explorer — §6.3 */
  var EQ = [
    {t:'walk-in cooler',
     sym:'The box is not holding temperature, there is frost on the evaporator, or there is water on the floor that was not there yesterday.',
     risk:'Georgia requires cold holding at 41°F or below. Product held warmer than that is a priority violation, and everything on the shelves is in question.'},
    {t:'walk-in freezer',
     sym:'Ice is building on the coil, the door will not seal properly, or the compressor is starting and stopping in short bursts.',
     risk:'Frozen inventory is usually the most expensive thing in the building, and a freezer that thaws does not simply refreeze.'},
    {t:'ice machine',
     sym:'Production has dropped off, the cubes are hollow or cloudy, there is water in the bin, or the unit is short-cycling.',
     risk:'In a bar or a quick-service kitchen, no ice stops service — and scale build-up is behind most of it, which means it comes back.'},
    {t:'reach-in',
     sym:'Temperature is drifting, the fans never stop, or there is condensation forming on the inside of the glass.',
     risk:'The reach-in closest to the line is the one that fails during service, when nobody has time to notice until product is already warm.'},
    {t:'prep table',
     sym:'Pans are warm at the top, the rail is not holding temperature, or the unit is icing up underneath the pans.',
     risk:'Held product on a prep rail is the first thing an inspector checks, and it is the hardest thing to explain away.'},
    {t:'commercial HVAC',
     sym:'A rooftop unit has stopped cooling, the dining room is uncomfortable, or breakers are tripping on the packaged unit.',
     risk:'A hot dining room empties faster than a broken cooler does, and the guests who leave do not tell you why.'}
  ];
  var list = document.getElementById('eqlist'),
      media = document.getElementById('eqmedia'),
      body = document.getElementById('eqbody');
  if (list) {
    var symEl = body.querySelector('[data-sym]'),
        riskEl = body.querySelector('[data-risk]'),
        lnkEl = body.querySelector('[data-lnk]'),
        btns = [].slice.call(list.querySelectorAll('button')),
        frames = [].slice.call(media.querySelectorAll('.fr'));

    var show = function(i){
      btns.forEach(function(b,x){ b.setAttribute('aria-selected', x===i ? 'true' : 'false'); });
      frames.forEach(function(f,x){ f.classList.toggle('on', x===i); });
      symEl.textContent = EQ[i].sym;
      riskEl.textContent = EQ[i].risk;
      lnkEl.childNodes[0].nodeValue = 'See ' + EQ[i].t + ' service ';
    };
    show(0);
    btns.forEach(function(b,i){
      b.addEventListener('click', function(){ show(i); });
      b.addEventListener('mouseenter', function(){ if (window.matchMedia('(hover:hover)').matches) show(i); });
      b.addEventListener('keydown', function(e){
        var n = e.key === 'ArrowDown' ? i+1 : e.key === 'ArrowUp' ? i-1 : null;
        if (n === null) return;
        e.preventDefault();
        n = (n + btns.length) % btns.length;
        btns[n].focus(); show(n);
      });
    });
  }
})();