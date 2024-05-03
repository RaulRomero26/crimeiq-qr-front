import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const GraficaDatos = ({ datosFiltrados }) => {
  const graficoRef = useRef(null);
  const canvasId = useRef(`canvas-${Math.random().toString(36).substring(7)}`);

  useEffect(() => {
    if (!datosFiltrados || datosFiltrados.length === 0) {
      return;
    }

    // Si hay un gráfico anterior, destrúyelo antes de crear uno nuevo
    if (graficoRef.current instanceof Chart) {
      graficoRef.current.destroy();
    }

    const ctx = graficoRef.current.getContext('2d');
    const fechas = datosFiltrados.map((dato) => dato.fechaEscaneo);
    const contadorFechas = fechas.reduce((contador, fecha) => {
      contador[fecha] = (contador[fecha] || 0) + 1;
      return contador;
    }, {});
    const fechasUnicas = Object.keys(contadorFechas);
    const frecuencias = Object.values(contadorFechas);

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: fechasUnicas,
        datasets: [{
          label: 'Cantidad de Registros por Fecha',
          data: frecuencias,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    // Limpiar el gráfico al desmontar el componente
    return () => {
      if (graficoRef.current instanceof Chart) {
        graficoRef.current.destroy();
      }
    };
  }, [datosFiltrados]);

  return <canvas id={canvasId.current} ref={graficoRef} />;
};

export default GraficaDatos;

