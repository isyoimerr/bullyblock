const puntos = [
  'Escucha sin interrumpir ni minimizar lo que te cuenten.',
  'Agradece la confianza y explica que vas a avisar a orientación.',
  'No prometas secreto absoluto si hay riesgo, pero sí cuida la privacidad.',
  'No confrontes al estudiante delante de others ni lo publiques en el grupo.',
  'Pasa el caso a orientación ese mismo día si hay inquietud o riesgo.',
]

export default function DocenteGuia() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-slate-900">Guía para docentes</h1>
      <div className="card p-4">
        <ul className="space-y-3">
          {puntos.map((punto) => (
            <li key={punto} className="flex gap-2 text-sm text-slate-700">
              <span className="mt-1 h-2 w-2 rounded-full bg-blue-700" aria-hidden="true" />
              <span>{punto}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
