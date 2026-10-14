const TEMAS = [
  { t: 'Qué es el bullying', p: 'Es cuando una persona o un grupo agrede a otra de forma repetida y con desequilibrio de poder: golpes, burlas, exclusión o amenazas. Duele aunque se disfrace de “broma”.' },
  { t: 'Tipos de bullying', p: 'Físico (golpes, empujones), verbal (apodos, insultos), social (excluir, esparcir rumores), y daño a pertenencias. Muchas veces se mezclan.' },
  { t: 'Ciberbullying', p: 'Ocurre en chats, redes y juegos. Guarda capturas de pantalla, no respondas a las provocaciones, bloquea a la persona y repórtalo.' },
  { t: 'Consecuencias', p: 'Puede causar tristeza, miedo, bajo rendimiento y ganas de no ir al colegio. Pedir ayuda a tiempo evita que se agrave.' },
  { t: 'Cómo prevenirlo', p: 'Con respeto, empatía y no siendo espectador. Incluir a otros, no reírse de los chistes que hieren y avisar cuando algo está mal.' },
  { t: 'Convivencia escolar', p: 'En Colombia, la Ley 1620 de 2013 crea el Sistema Nacional de Convivencia Escolar y establece rutas para prevenir y atender estas situaciones. Tienes derecho a estudiar sin miedo.' },
]

export default function Informacion() {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-4 text-2xl md:text-3xl">Para entender mejor</h1>
      <div className="space-y-3">
        {TEMAS.map((x) => (
          <article key={x.t} className="card">
            <h2 className="mb-1 text-lg md:text-xl">{x.t}</h2>
            <p className="text-suave">{x.p}</p>
          </article>
        ))}
      </div>
    </div>
  )
}
