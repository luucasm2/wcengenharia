import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight, Menu, X, Instagram, Facebook, MessageCircle, Check, HardHat, Building2, Ruler, DraftingCompass, ShieldCheck, Plus, Quote, ChevronRight } from 'lucide-react';
import './styles.css';

const fotos = {
  hero: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2200&q=90',
  casa: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1100&q=85',
  projeto: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1100&q=85',
  video: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2200&q=85',
  predio: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=85',
  destaque: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2200&q=85',
  cidade: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=2200&q=85',
  noticia1: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=85',
  noticia2: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=700&q=85',
  noticia3: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=700&q=85',
  noticia4: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=700&q=85',
  noticia5: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=700&q=85'
};

const especialidades = [
  { icon: <Building2/>, nome: 'Construção civil' },
  { icon: <Ruler/>, nome: 'Projetos e arquitetura' },
  { icon: <DraftingCompass/>, nome: 'Planejamento' },
  { icon: <HardHat/>, nome: 'Gerenciamento de obras' },
  { icon: <ShieldCheck/>, nome: 'Qualidade e segurança' },
  { icon: <Plus/>, nome: 'Soluções completas' }
];

function Cabecalho() {
  const [aberto, setAberto] = useState(false);
  return <header className="header">
    <a href="#inicio" className="logo-dem" aria-label="WC Engenharia - início">
      <span className="brand-monogram" aria-hidden="true">WC</span>
      <span>WC<small>ENGENHARIA</small></span>
    </a>
    <button className="menu-toggle" onClick={() => setAberto(!aberto)} aria-label="Abrir menu">{aberto ? <X/> : <Menu/>}</button>
    <nav className={aberto ? 'nav nav-open' : 'nav'}>
      {[['Início','inicio'],['A empresa','empresa'],['Serviços','servicos'],['Projetos','projetos'],['Avaliações','avaliacoes'],['Contato','contato']].map(([nome,id]) =>
        <a key={id} href={'#'+id} onClick={() => setAberto(false)}>{nome}</a>)}
      <a className="nav-contact" href="#contato">Fale conosco <ArrowUpRight size={14}/></a>
    </nav>
  </header>;
}

function Selo({children, claro=false}) { return <div className={'eyebrow'+(claro?' eyebrow-light':'')}><span/>{children}</div>; }
function Botao({children, href='#contato', claro=false}) { return <a className={'pill-button'+(claro?' pill-light':'')} href={href}>{children}<ArrowUpRight size={14}/></a>; }

function Contador({valor, sufixo='+'}) {
  const [numero, setNumero] = useState(0);
  useEffect(() => {
    let inicio = null;
    const duracao = 1900;
    let frame;
    const animar = (tempo) => {
      if (inicio === null) inicio = tempo;
      const progresso = Math.min((tempo-inicio)/duracao, 1);
      const suavizado = 1-Math.pow(1-progresso, 3);
      setNumero(Math.floor(valor*suavizado));
      if (progresso < 1) frame = requestAnimationFrame(animar);
    };
    frame = requestAnimationFrame(animar);
    return () => cancelAnimationFrame(frame);
  }, [valor]);
  return <>{numero.toLocaleString('pt-BR')}<span>{sufixo}</span></>;
}

function Inicio() {
  return <section className="hero" id="inicio" style={{backgroundImage:`linear-gradient(90deg,rgba(9,15,12,.76),rgba(9,15,12,.18)),url(${fotos.hero})`}}>
    <div className="hero-content"><Selo claro>Engenharia · Construção · Realização</Selo>
      <h1>Construindo hoje.<br/><em>Transformando o amanhã.</em></h1>
      <p>Planejamento, compromisso e qualidade em cada etapa. Construímos espaços que valorizam histórias e criam novas possibilidades.</p>
      <Botao>Conheça a WC</Botao>
    </div>
    <div className="hero-stats">
      <div><strong>Projeto</strong><small>Planejamento em cada etapa</small></div>
      <div><strong>Confiança</strong><small>Responsabilidade do início ao fim</small></div>
    </div>
    <div className="hero-scroll">DESCUBRA A WC <span/></div>
  </section>;
}

function FaixaEspecialidades() {
  const grupo = <div className="marquee-group">{especialidades.map((item,i)=><div className="specialty" key={item.nome+'-'+i}><span className="specialty-icon">{item.icon}</span><small>{item.nome}</small></div>)}</div>;
  return <section className="specialty-strip" aria-label="Áreas de atuação"><div className="marquee-track">{grupo}{grupo}</div></section>;
}

function Empresa() {
  return <section className="intro section" id="empresa">
    <div className="intro-grid wrap">
      <div className="intro-photo"><img src={fotos.casa} alt="Projeto residencial contemporâneo"/><span className="photo-tag">WC ENGENHARIA · COMPROMISSO EM CADA DETALHE</span></div>
      <div className="intro-copy"><Selo>Quem somos</Selo><h2>Estrutura, confiança<br/>e qualidade para<br/><em>construir grandes histórias.</em></h2>
        <p>A WC Engenharia trabalha para transformar projetos em realidade, unindo planejamento, responsabilidade técnica e atenção aos detalhes em cada fase da obra.</p>
        <div className="signature"><span>WC</span><div><b>WC Engenharia</b><small>Compromisso que se constrói</small></div></div>
        <Botao>Saiba mais</Botao>
      </div>
      <div className="intro-small"><img src={fotos.projeto} alt="Detalhe de projeto arquitetônico"/><span>Projetos com propósito</span></div>
    </div>
  </section>;
}

function VideoSection() {
  return <section className="video-banner" style={{backgroundImage:`linear-gradient(0deg,rgba(6,12,9,.55),rgba(6,12,9,.12)),url(${fotos.video})`}}>
    <div><Selo claro>Nosso jeito de construir</Selo><h2>Excelência em cada etapa.</h2><p>Do planejamento à entrega, cuidado em cada detalhe.</p></div>
  </section>;
}

function Servicos() {
  const [selecionado,setSelecionado] = useState(-1);
  const cards = [
    ['01','Engenharia e planejamento','Soluções técnicas e planejamento cuidadoso para que cada projeto avance com segurança e eficiência.'],
    ['02','Execução de obras','Gestão integrada, acompanhamento próximo e atenção aos padrões de qualidade em todas as etapas.'],
    ['03','Reformas e projetos','Ambientes renovados e projetos pensados para unir funcionalidade, estética e durabilidade.']
  ];
  return <section className="quality section" id="servicos"><div className="wrap">
    <div className="section-heading"><div><Selo>Nossas soluções</Selo><h2>Da ideia à entrega,<br/><em>construímos com você.</em></h2></div><p>Uma atuação integrada para transformar necessidades em soluções concretas, com transparência e responsabilidade.</p></div>
    <div className="quality-grid"><div className="quality-image"><img src={fotos.predio} alt="Edifício moderno"/></div>
      {cards.map((c,i)=><button type="button" className={'quality-card service-card'+(selecionado===i?' is-active':'')} key={c[0]} onClick={()=>setSelecionado(selecionado===i?-1:i)} aria-pressed={selecionado===i}>
        <span className="number">{c[0]}</span><div className="card-icon">{[<DraftingCompass/>,<HardHat/>,<Building2/>][i]}</div><h3>{c[1]}</h3><p>{c[2]}</p><span className="service-indicator"><Plus size={15}/></span>
      </button>)}
    </div>
  </div></section>;
}

function ProjetoDestaque() {
  return <section className="feature-banner" id="projetos" style={{backgroundImage:`linear-gradient(90deg,rgba(6,12,9,.12),rgba(6,12,9,.58)),url(${fotos.destaque})`}}>
    <div className="feature-text"><Selo claro>Projetos em destaque</Selo><h2>Espaços que<br/><em>inspiram o futuro.</em></h2><Botao claro>Ver projetos</Botao></div>
    <div className="feature-caption">WC ENGENHARIA <span>—</span> QUALIDADE EM CADA OBRA</div>
  </section>;
}

function Diferenciais() {
  const items = [
    ['01','Compromisso com prazos','Planejamento responsável e acompanhamento contínuo de cada etapa.'],
    ['02','Qualidade construtiva','Escolhas técnicas e atenção aos detalhes em busca de resultados duradouros.'],
    ['03','Transparência na relação','Comunicação clara e parceria durante todo o desenvolvimento do projeto.']
  ];
  return <section className="difference section"><div className="wrap">
    <div className="center-heading"><Selo>Nosso compromisso</Selo><h2>O que faz a WC<br/><em>ser diferente.</em></h2></div>
    <div className="difference-grid">{items.map((x,i)=><article className="difference-card" key={x[0]}><div className="diff-photo" style={{backgroundImage:`url(${[fotos.casa,fotos.projeto,fotos.destaque][i]})`}}/><div className="diff-body"><span>{x[0]}</span><div><h3>{x[1]}</h3><p>{x[2]}</p></div><ShieldCheck size={17}/></div></article>)}</div>
  </div></section>;
}

function Depoimentos() {
  return <section className="testimonials" style={{backgroundImage:`linear-gradient(90deg,rgba(9,17,13,.82),rgba(9,17,13,.40)),url(${fotos.cidade})`}}>
    <div className="wrap testimonial-inner"><div className="testimonial-title"><Selo claro>Relacionamentos que constroem</Selo><h2>Parcerias fortes.<br/><em>Resultados sólidos.</em></h2><div className="rating"><strong>WC</strong><span>COMPROMISSO<small>Presença em cada etapa</small></span></div></div>
      <div className="quote-card"><Quote className="quote-mark"/><p>Uma obra bem conduzida começa com planejamento, diálogo e responsabilidade. É assim que queremos construir cada parceria.</p><div className="quote-person"><b>Nosso compromisso</b><small>Qualidade do início ao fim</small></div></div>
      <div className="quote-card quote-card-two"><Quote className="quote-mark"/><p>Mais do que entregar espaços, buscamos entregar confiança, tranquilidade e valor em cada projeto realizado.</p><div className="quote-person"><b>Nosso propósito</b><small>Construir relações duradouras</small></div></div>
    </div>
  </section>;
}

function Avaliacoes() {
  const exemplos = [
    {
      texto: 'A comunicação clara e o planejamento cuidadoso fazem toda a diferença para acompanhar uma obra com tranquilidade.',
      identificacao: 'Exemplo fictício 01',
      contexto: 'Texto demonstrativo — não é avaliação real'
    },
    {
      texto: 'Ter etapas bem organizadas e informações transparentes ajuda a tomar decisões com mais segurança durante o projeto.',
      identificacao: 'Exemplo fictício 02',
      contexto: 'Texto demonstrativo — não é avaliação real'
    },
    {
      texto: 'Um bom projeto começa com escuta, responsabilidade técnica e atenção aos detalhes que fazem sentido para cada cliente.',
      identificacao: 'Exemplo fictício 03',
      contexto: 'Texto demonstrativo — não é avaliação real'
    }
  ];
  return <section className="reviews-section section" id="avaliacoes">
    <div className="wrap">
      <div className="reviews-heading">
        <div><Selo>Relacionamento e confiança</Selo><h2>O que valorizamos<br/><em>em cada parceria.</em></h2></div>
        <p>Exemplos de conteúdo para demonstrar como avaliações autorizadas poderão aparecer no site.</p>
      </div>
      <div className="demo-notice"><ShieldCheck size={17}/><span>AVALIAÇÕES FICTÍCIAS PARA DEMONSTRAÇÃO. Não representam clientes ou experiências reais. Substitua por depoimentos verdadeiros, com autorização, antes de divulgar como avaliações.</span></div>
      <div className="reviews-grid">
        {exemplos.map((item, i) => <article className="review-card" key={item.identificacao}>
          <div className="review-stars" aria-label="Elemento gráfico demonstrativo">★★★★★</div>
          <Quote className="review-quote"/>
          <p>{item.texto}</p>
          <div className="review-person"><b>{item.identificacao}</b><small>{item.contexto}</small></div>
        </article>)}
      </div>
    </div>
  </section>;
}

function Contato() {
  const [enviado,setEnviado] = useState(false);
  function enviar(e){e.preventDefault();setEnviado(true);}
  return <section className="contact-cta" id="contato" style={{backgroundImage:`linear-gradient(90deg,rgba(9,17,14,.82),rgba(9,17,14,.48)),url(${fotos.cidade})`}}>
    <div className="wrap contact-layout"><div className="contact-copy"><Selo claro>Vamos conversar</Selo><h2>Seu próximo projeto<br/><em>começa aqui.</em></h2><p>Conte um pouco sobre o que você precisa. A equipe da WC Engenharia está pronta para entender seu projeto.</p></div>
      <form className="contact-form" onSubmit={enviar}><div className="form-top"><span>Fale sobre seu projeto</span><span>CONTATO WC</span></div>
        {enviado ? <div className="success"><span><Check/></span><h3>Obrigado pelo contato!</h3><p>Esta é uma demonstração visual. Nenhum dado foi enviado ou armazenado.</p><button type="button" onClick={()=>setEnviado(false)}>Enviar outra mensagem</button></div> : <>
          <div className="form-row"><label>Seu nome<input required placeholder="Nome completo"/></label><label>Seu e-mail<input type="email" required placeholder="voce@email.com"/></label></div>
          <div className="form-row"><label>Telefone<input type="tel" placeholder="(00) 00000-0000"/></label><label>Tipo de projeto<select defaultValue=""><option value="" disabled>Selecione</option><option>Construção</option><option>Reforma</option><option>Projeto e planejamento</option><option>Outro assunto</option></select></label></div>
          <label>Conte um pouco mais<textarea rows="3" placeholder="Descreva sua necessidade..."/></label>
          <p className="form-privacy">Demonstração: este formulário não envia nem armazena seus dados. Antes da publicação, conecte um serviço seguro de atendimento e atualize a Política de Privacidade.</p>
          <button className="submit-button">Enviar mensagem <ArrowUpRight size={15}/></button>
        </>}
      </form>
    </div>
  </section>;
}

function Noticias() {
  const posts = [
    ['Planejamento: o primeiro passo de uma boa obra','Obras','Como organização e planejamento ajudam a alcançar melhores resultados.',fotos.noticia1],
    ['Escolhas que valorizam um projeto','Projetos','A importância de pensar em funcionalidade e durabilidade.',fotos.noticia2],
    ['Qualidade em cada detalhe','Qualidade','Cuidado técnico em todas as fases da construção.',fotos.noticia3],
    ['Construção e desenvolvimento','Mercado','Soluções para espaços cada vez melhores.',fotos.noticia4],
    ['Acompanhamento de obras','Gestão','Transparência e comunicação durante a execução.',fotos.noticia5]
  ];
  return <section className="journal section" id="noticias"><div className="wrap"><div className="section-heading"><div><Selo>Conteúdos WC</Selo><h2>Novidades e<br/><em>informações.</em></h2></div><Botao>Fale com a WC</Botao></div>
    <div className="journal-grid"><article className="lead-post"><img src={posts[0][3]} alt="Projeto de construção"/><div><span>{posts[0][1]}</span><h3>{posts[0][0]}</h3><p>{posts[0][2]}</p><a href="#contato">Saiba mais <ArrowUpRight size={14}/></a></div></article>
      <div className="post-list">{posts.slice(1).map(p=><article className="post" key={p[0]}><img src={p[3]} alt="Imagem de construção"/><div><span>{p[1]}</span><h3>{p[0]}</h3><small>{p[2]}</small></div><ChevronRight size={17}/></article>)}</div>
    </div>
  </div></section>;
}

function Privacidade() {
  return <section className="privacy-section" id="privacidade">
    <div className="wrap privacy-wrap">
      <div><Selo>Transparência</Selo><h2>Privacidade e<br/><em>uso de informações.</em></h2></div>
      <div className="privacy-content">
        <p><b>Política demonstrativa — requer validação antes da publicação.</b> Este texto é uma base inicial e precisa ser ajustado aos processos reais da WC Engenharia, com os dados de identificação e contato do controlador.</p>
        <h3>Dados informados em formulários</h3>
        <p>Nesta versão demonstrativa, o formulário apenas apresenta uma confirmação na tela. O código atual não transmite nem grava os dados digitados. Se for conectado a e-mail, CRM ou outro serviço, esta política deverá informar o responsável, as finalidades, a base legal, os destinatários, o prazo de retenção e como exercer os direitos previstos na LGPD.</p>
        <h3>Cookies e serviços externos</h3>
        <p>O projeto utiliza fontes hospedadas pelo Google Fonts e imagens externas do Unsplash. O carregamento desses recursos pode envolver o recebimento de dados técnicos pelo respectivo fornecedor. Não há, nesta versão do código, ferramenta própria de analytics ou publicidade. Se forem adicionadas ferramentas de medição, mapas, vídeos, pixels ou cookies não essenciais, revise os avisos e mecanismos de consentimento aplicáveis antes de ativá-los.</p>
        <h3>Direitos de imagem e conteúdo</h3>
        <p>As fotografias atualmente utilizadas são ilustrativas e carregadas de URLs externas. Antes da publicação, confirme a licença e as condições de uso de cada arquivo e substitua imagens sem licença adequada. Fotos de funcionários, clientes ou terceiros só devem ser publicadas com base legal apropriada e, quando necessário, autorização documentada para o uso de imagem.</p>
        <h3>Direitos dos titulares e contato</h3>
        <p>Para solicitações sobre dados pessoais, informe um canal de contato oficial e os dados completos da empresa/controlador. Esses dados ainda precisam ser preenchidos pela WC Engenharia. A política final deve explicar como solicitar acesso, correção, eliminação quando aplicável e demais direitos previstos na LGPD.</p>
        <p className="privacy-warning">Antes de publicar: preencher razão social, CNPJ, endereço, e-mail de privacidade e canal do titular; mapear todos os serviços integrados; definir retenção e segurança; validar o texto com profissional jurídico ou encarregado de dados. Esta página não constitui aconselhamento jurídico nem garante ausência de responsabilização.</p>
      </div>
    </div>
  </section>;
}

function Rodape() {
  return <footer className="footer"><div className="footer-main wrap">
    <div className="footer-brand"><a href="#inicio" className="logo-dem footer-logo"><span className="brand-monogram" aria-hidden="true">WC</span><span>WC<small>ENGENHARIA</small></span></a><p>Engenharia com responsabilidade.<br/>Soluções construídas com confiança.</p><div className="socials">
      <a href="#contato" aria-label="Instagram oficial a informar" title="Adicione o Instagram oficial da WC Engenharia"><Instagram/></a>
      <a href="#contato" aria-label="WhatsApp - link a adicionar" title="Link do WhatsApp será adicionado"><MessageCircle/></a>
      <a href="#contato" aria-label="Facebook - link a adicionar" title="Link do Facebook será adicionado"><Facebook/></a>
    </div></div>
    <div className="footer-col"><b>Navegação</b><a href="#empresa">A empresa</a><a href="#servicos">Serviços</a><a href="#projetos">Projetos</a><a href="#avaliacoes">Avaliações demonstrativas</a><a href="#contato">Contato</a><a href="#privacidade">Política de Privacidade</a></div>
    <div className="footer-col"><b>Fale conosco</b><a href="#contato">Solicite um atendimento</a><a href="#contato">Redes sociais oficiais</a><span>Atendimento mediante agendamento</span></div>
  </div><div className="footer-bottom wrap"><span>© {new Date().getFullYear()} WC Engenharia. Todos os direitos reservados.</span><div><a href="#inicio">Voltar ao topo ↑</a></div></div></footer>;
}

function App() {
  return <><Cabecalho/><main><Inicio/><FaixaEspecialidades/><Empresa/><VideoSection/><Servicos/><ProjetoDestaque/><Diferenciais/><Depoimentos/><Avaliacoes/><Contato/><Noticias/><Privacidade/></main><Rodape/></>;
}
createRoot(document.getElementById('root')).render(<App/>);
