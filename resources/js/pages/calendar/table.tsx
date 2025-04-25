const headers = [
    'DNI', 'Nombre', 'Lunes', 'Martes', 'Miércoles', 'Jueves',
    'Viernes', 'Sábado', 'Domingo', 'Inicio Semana', 'Fin Semana',
  ];
  
  export default function Table() {
    return (
      <div className="bg-card text-card-foreground shadow-md rounded-xl overflow-auto">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  className="bg-primary text-primary-foreground px-4 py-3 border border-border text-left"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(9)].map((_, i) => (
              <tr key={i}>
                {headers.map((_, j) => (
                  <td
                    key={j}
                    className="px-4 py-2 border border-border bg-background text-foreground"
                  >
                    {/* Espacio para que escribas luego */}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  