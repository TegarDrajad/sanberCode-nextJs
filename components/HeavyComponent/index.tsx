import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import ImgBg from '@/assets/background.jpeg';

// Getting Chart.js Component
Chart.register(...registerables);

export default function HeavyComponent() {
    const [data, setData] = useState<number[]>([])

    function expensiveCalculation(n: number): number {
        if (n <= 1) return n 
        return expensiveCalculation(n - 1) + expensiveCalculation(n - 2)
    }

    useEffect(() => {
        const calculateData = Array.from({ length: 20 }, (_, i) => 
            expensiveCalculation(i),
        )
        setData(calculateData)
    }, [])

    return (
        <div>
            <h2>Heavy Component Rendered!</h2>

            {/* Grafik Berat */}
            <Line 
                data={{
                    labels: data.map((_, i) => `Step ${i}`),
                    datasets: [{ label: 'Fibonacci', data, borderColor: 'red'}],
                }}
                options={{
                    scales: {
                        x: { type: 'category' }, // Pastikan skala kategori digunakan
                        y: { beginAtZero: true }
                    }
                }}
            />

            {/* Gambar Besar */}
            <img src="/background.jpeg" alt="Background" />
            <p>Data Fibonacci (berat dihitung): {JSON.stringify(data)}</p>
        </div>
    )
}
