import type { Metadata } from "next";
import { site } from "@/lib/content";
import { PageBody, PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Img } from "@/components/Img";

export const metadata: Metadata = { title: "Tassellazioni" };

const T = "images/tassellazioni/";

function Figure({
  src,
  alt,
  caption,
  max = "max-w-xl",
}: {
  src: string;
  alt: string;
  caption?: string;
  max?: string;
}) {
  return (
    <figure className={`mx-auto my-8 ${max}`}>
      <Img src={T + src} alt={alt} sizes="(min-width: 768px) 700px, 100vw" className="w-full rounded-2xl ring-1 ring-prussian-500/25" />
      {caption && <figcaption className="mt-3 text-center font-mono text-xs text-prussian-300">{caption}</figcaption>}
    </figure>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="my-8 flex flex-wrap items-center justify-center gap-5">{children}</div>;
}

function Cell({ src, alt, caption, basis }: { src: string; alt: string; caption?: string; basis: string }) {
  return (
    <figure className={`min-w-[200px] flex-1 ${basis}`}>
      <Img src={T + src} alt={alt} sizes="(min-width: 768px) 400px, 100vw" className="mx-auto w-full rounded-2xl ring-1 ring-prussian-500/25" />
      {caption && (
        <figcaption className="mt-3 text-center font-mono text-xs text-prussian-300">{caption}</figcaption>
      )}
    </figure>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="title-serif mb-4 mt-12 text-2xl">{children}</h3>;
}

const toc = [
  { id: "introduzione", label: "Introduzione" },
  { id: "periodiche", label: "Periodiche" },
  { id: "non-periodiche", label: "Non periodiche" },
  { id: "einstein", label: "Il tassello Einstein" },
];

export default function TassellazioniPage() {
  return (
    <>
      <PageHero eyebrow="Miscellanea · Divulgazione" title="Tassellazioni del piano" photo={site.backgrounds.tassellazioni}>
        <nav aria-label="Indice" className="animate-rise mt-8 flex flex-wrap gap-2" style={{ "--delay": "260ms" } as React.CSSProperties}>
          {toc.map((t) => (
            <a key={t.id} href={`#${t.id}`} className="btn btn-sm btn-ghost">
              {t.label}
            </a>
          ))}
        </nav>
      </PageHero>
      <PageBody>
        <article lang="it" className="prose-site text-[1.05rem] leading-[1.8]">
          <Reveal as="section" id="introduzione">
            <h2 className="title-serif mb-6 text-4xl">Introduzione alle tassellazioni</h2>
            <p>
              Una tassellazione è una configurazione costituita da poligoni o figure, detti tasselli, uguali o differenti tra loro,
              che ricoprono una porzione di piano, l&apos;intero piano o l&apos;intero spazio. I due requisiti essenziali sono che
              il ricoprimento sia completo, senza spazi tra i tasselli, e non vi siano sovrapposizioni tra le tessere.
            </p>
            <blockquote className="title-serif my-8 border-l-2 border-glacier pl-6 text-2xl italic leading-snug">
              Sulla base di questa immagine mentale, quali possono essere esempi di tassellazioni che si incontrano quotidianamente?
            </blockquote>
            <p>
              Alcuni esempi sono sicuramente le piastrellature di pavimenti o pareti, oppure particolari decorazioni artistiche, come
              quelle dell&apos;Alhambra a Granada.
            </p>
            <p>
              Le prime tassellazioni risalgono ai Sumeri, mentre il primo matematico che le ha studiate in tempi più recenti è
              Keplero: ne troviamo infatti traccia nel trattato &ldquo;<em>Le armonie del mondo</em>&rdquo; del 1619.
            </p>
            <Figure
              src="pp,550x550.u2.jpg"
              alt="Tassellazione periodica storica"
              caption="Particolare di decorazioni artistiche, Alhambra (Granada)."
              max="max-w-md"
            />
            <p>Una definizione più rigorosa è la seguente.</p>
            <div className="surface my-8 p-6 sm:p-8">
              <h3 className="eyebrow mb-3">Definizione</h3>
              <p>
                Consideriamo un insieme <em>S</em>, lo <em>spazio</em>, e un sottoinsieme <em>P</em> di <em>S</em>, i{" "}
                <em>prototipi dei tasselli</em>, che assumiamo essere senza buchi, limitati e formati da un pezzo solo ciascuno
                (ossia <em>connessi</em>). Preso un sottoinsieme <em>X</em> di S, una <em>tassellazione</em> di <em>X</em> di tipo{" "}
                <em>P</em> è un insieme finito, o infinito numerabile, <em>T</em> di tasselli con le seguenti proprietà:
              </p>
              <ol className="mt-3 list-[lower-alpha]">
                <li>l&apos;unione di tutti i tasselli è <em>X</em>,</li>
                <li>tasselli distinti hanno parti interne disgiunte.</li>
              </ol>
            </div>
            <p>
              Una tassellazione è <em>propria</em> se i tasselli si incontrano solo in corrispondenze lato-lato o vertice-vertice. Le
              tassellazioni si distinguono in tassellazioni periodiche (come quella nella figura precedente) e non periodiche.
            </p>
          </Reveal>

          <Reveal as="section" id="periodiche" className="mt-20">
            <h2 className="title-serif mb-6 text-4xl">Le tassellazioni periodiche</h2>
            <p>
              Una tassellazione si dice <em>periodica</em> se viene costruita ripetendo una cella elementare di base.
            </p>

            <H3>Il caso piano</H3>
            <p>
              <strong>Teorema</strong> Una tassellazione piana <em>T</em> è periodica se e solo se esistono due vettori{" "}
              <strong>v</strong>
              <sub>1</sub>,<strong>v</strong>
              <sub>2</sub> linearmente indipendenti tali che se <em>T</em> viene traslata tramite <strong>v</strong>
              <sub>1</sub>,<strong>v</strong>
              <sub>2</sub>, rimane invariata.
            </p>
            <p>
              Osserviamo poi che per il <em>Teorema Fondamentale della Cristallografia</em>, che definisce i legami tra i parametri
              relativi agli assi di riferimento di un cristallo, si possono costruire tassellazioni periodiche piane utilizzando come
              cella elementare un poligono regolare se e solo se tale poligono è un triangolo, un quadrato o un esagono.
            </p>
            <Row>
              <Cell src="Triangoli.jpg" alt="Triangoli" caption="Triangoli" basis="max-w-[260px]" />
              <Cell src="Quadrati.jpg" alt="Quadrati" caption="Quadrati" basis="max-w-[370px]" />
              <Cell src="Esagoni.jpg" alt="Esagoni" caption="Esagoni" basis="max-w-[230px]" />
            </Row>

            <H3>Fatti curiosi</H3>
            <ul>
              <li>
                I pattern delle tassellazioni periodiche formano i 17 <em>gruppi cristallografici piani</em>.
              </li>
              <li>
                Il <em>problema di Domino</em>, ossia stabilire se un dato insieme di prototipi di tasselli possa originare una
                tassellazione periodica, è indecidibile.
              </li>
            </ul>

            <H3>Esempi</H3>
            <ul>
              <li>
                In natura, esempi di tassellazioni periodiche sono il favo delle api, le fratture del terreno roccioso, note come{" "}
                <em>tassellazioni di Gilbert</em>, oppure le soluzioni saponate che si aggregano tassellando lo spazio secondo le{" "}
                <em>leggi di Plateau</em>.
              </li>
              <li>
                Il grafico olandese Maurits Cornelis <em>Escher</em>, manipolando opportunamente un singolo modello ornamentale, ha
                costruito tassellazioni periodiche di grande effetto.
              </li>
            </ul>
            <Row>
              <Cell src="tassellazione periodica 2.png" alt="Tassellazione di Escher 1" basis="max-w-[380px] min-w-[260px]" />
              <Cell src="tassellazione periodica.jpg" alt="Tassellazione di Escher 2" basis="max-w-[410px] min-w-[260px]" />
            </Row>

            <H3>Applicazioni</H3>
            <p>
              Una delle applicazioni più comuni delle tassellazioni periodiche è sicuramente il <em>rendering di ambienti 3D</em> in
              computer grafica: tassellando le figure da rappresentare, si può creare una forma tridimensionale più dettagliata.
              Rendendo dinamica la tassellazione, in modo che si adatti in base alla vicinanza dell&apos;oggetto, si può inoltre
              ottenere un risparmio di risorse.
            </p>
          </Reveal>

          <Reveal as="section" id="non-periodiche" className="mt-20">
            <h2 className="title-serif mb-6 text-4xl">Le tassellazioni non periodiche</h2>
            <p>Le tassellazioni non periodiche sono quelle che non possiedono simmetrie traslazionali.</p>

            <H3>Le tassellazioni di Penrose</H3>
            <p>
              Il matematico Roger Penrose (1931 – ) ha scoperto l&apos;esistenza di particolari tipi di tasselli che hanno la
              particolarità di essere replicabili in modo non periodico.
            </p>
            <Figure src="cattura5.PNG" alt="Tassellazione di Penrose" max="max-w-3xl" />

            <H3>Applicazioni</H3>
            <p>
              Una delle maggiori applicazioni delle tassellazioni aperiodiche è lo studio dei <em>quasicristalli</em>, particolari
              materiali in cui gli atomi sono disposti in una struttura deterministica ma non ripetitiva, cioè non periodica. Un
              esempio ne è l&apos;icosaedrite, scoperta nel 2009.
            </p>
          </Reveal>

          <Reveal as="section" id="einstein" className="mt-20">
            <h2 className="title-serif mb-6 text-4xl">Il tassello Einstein</h2>
            <p>
              Per molto tempo è stato un problema aperto, noto come ricerca del tassello di Einstein, trovare una tassellazione del
              piano che utilizzi un solo tipo di tassello ripetuto in modo non periodico. Nel tempo sono stati proposti numerosi
              candidati come tassello di Einstein, ma in generale si erano sempre scontrati in qualche modo con la definizione
              iniziale. A Marzo 2023, il team di David Smith ha fornito un esempio di tassellazione monoedrica non periodica. Tale
              tassello è stato chiamato Hat e può essere costruito combinando opportunamente 16 triangoli rettangoli congruenti.
            </p>
            <Figure src="tassello cappello.jpg" alt="Il tassello Hat" caption="Il tassello Hat" max="max-w-[350px]" />
            <p>
              Il team di ricerca ha dichiarato che con il tassello Hat è possibile costruire una tassellazione monoedrica, cioè che
              usa un solo tipo di tassello, aperiodica. Nell&apos;articolo, forniscono addirittura un&apos;intera famiglia di
              tasselli di Einstein: gli appartenenti sono l&apos;uno il trasformato dell&apos;altro tramite manipolazioni
              indipendenti e continue. Nella comunità accademica, il tassello Hat desta però ancora qualche dubbio: per raggiungere
              l&apos;aperiodicità è infatti necessario utilizzare anche il suo speculare. Questo problema è stato risolto da un altro
              membro della famiglia di tasselli scoperto a maggio 2023 sempre dal team di David Smith, il tassello Spectre. Di fatto
              è stato trovato un esemplare di tassello di Einstein.
            </p>
            <Figure src="Cattura8.PNG" alt="Il tassello Spectre" max="max-w-md" />
            <p>
              Il monotassello aperiodico è privo di simmetrie, ha 13 lati e gli angoli sono multipli di 30°, in modo da favorirne
              varie rotazioni.
            </p>
            <div className="my-8 grid items-center gap-6 md:grid-cols-[1fr_2fr]">
              <Img src={T + "Cattura.PNG"} alt="Dettagli del tassello Spectre" sizes="(min-width: 768px) 300px, 100vw" className="mx-auto w-full max-w-xs rounded-2xl ring-1 ring-prussian-500/25" />
              <p className="!mt-0">
                Si nota facilmente che la faccia rossa e il suo speculare non possono essere sovrapposte ottenendo la stessa
                figura: il tassello è detto chirale.
              </p>
            </div>
            <p>Accostando alcune piastrelle per traslazione si ottiene una torre di spettri.</p>
            <Figure src="Cattura2.PNG" alt="Torre di Spectre" caption="Torre di Spectre" max="max-w-sm" />
            <p>
              Si possono impilare quante piastrelle si voglia; impilandone due o tre, si può ancora estendere la tassellazione, ma se
              la torre è composta da più di tre piastrelle ciò diventa impossibile. Tuttavia, violando la richiesta di monoedricità e
              usando anche il tassello speculare è possibile ottenere una tassellazione biedrica periodica, accostando due torri
              infinite, una di tasselli Spectre, e una di tasselli speculari. La striscia che si ottiene può essere replicata in
              modo da riempire tutto il piano.
            </p>

            <H3>Costruzione della tassellazione con lo Spectre</H3>
            <p>
              Per costruire la tassellazione aperiodica con lo Spectre è necessario iniziare combinando due tasselli: si ottiene il
              tassello Mystic, il cui nome deriva dal profilo che assomiglia ad un Buddha. Inoltre, tale costruzione è simmetrica
              rispetto all&apos;asse indicato nella figura seguente.
            </p>
            <Figure src="Cattura3.png" alt="Costruzione del tassello Mystic" caption="Costruzione del tassello Mystic" max="max-w-[450px]" />
            <p>
              Per proseguire con la tassellazione, si procede per livelli. Il primo livello consiste nel creare due aggregati, lo
              Spettro e il Mistico di livello 1.
            </p>
            <Row>
              <Cell src="Cattura4.PNG" alt="Spettro di livello 1" basis="basis-[35%] min-w-[250px]" />
              <Cell src="Spectre e Mystic.jpg" alt="Spettro e Mistico di livello 1" basis="basis-[58%] min-w-[280px]" />
            </Row>
            <p>
              Lo Spettro di livello 1 si ottiene circondando un Mistico (di livello 0) con 7 Spettri disposti come nella figura
              precedente a sinistra. Rispetto al tassello blu del Mistico e procedendo in senso orario, dal rosa più tenue al rosso,
              l&apos;angolo di rotazione di ciascuno Spettro è -120, -60, -60, 0, 60, 60, 120 gradi. Il Mistico di livello 1 si
              ottiene rimuovendo lo Spettro più esterno, come mostrato a destra nella figura precedente. Si noti quindi che tra i due
              aggregati vi è un solo tassello di differenza. Queste costruzioni sono il primo passo di una procedura che si
              generalizza e che permette di riempire regioni sempre più estese. Per la costruzione del secondo livello, come
              mostrato nella figura seguente, si considera un Mistico di primo livello, circondato da 6 spettri di livello 1, e se ne
              aggiungerà uno per lo Spettro di livello 2, e così via.
            </p>
            <Figure src="Cattura6.PNG" alt="Livello 2" max="max-w-[550px]" />
            <p>Si prosegue poi con il livello 3 nella figura seguente.</p>
            <Figure src="Cattura7.PNG" alt="Livello 3" max="max-w-xl" />
            <p>Per finire, la tassellazione monoedrica aperiodica dal livello 0 al livello 4.</p>
            <Figure src="10.PNG" alt="Tassellazione completa dal livello 0 al livello 4" max="max-w-full" />
          </Reveal>
        </article>
      </PageBody>
    </>
  );
}
