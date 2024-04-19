import React from "react";
import { Radar } from "react-chartjs-2";
import { Chart as ChartJS, LineController, LineElement, RadialLinearScale, PointElement, LinearScale, Title } from 'chart.js';
/*
Taste Palette of Coffee's in a radar chart format.
Available categories:
    Aroma: Refers to the scent or fragrance of the coffee.
    Flavor: The flavor of coffee is evaluated based on the taste, including any sweetness, bitterness, acidity, and other flavor notes.
    Aftertaste: Refers to the lingering taste that remains in the mouth after swallowing the coffee.
    Acidity: Acidity in coffee refers to the brightness or liveliness of the taste.
    Body: The body of coffee refers to the thickness or viscosity of the coffee in the mouth.
    Balance: Balance refers to how well the different flavor components of the coffee work together.

 */
ChartJS.register(LineController, LineElement, PointElement, RadialLinearScale, LinearScale, Title);
export function RadarChart() {
    const RadarData = {
        labels: ["Aroma", "Flavor", "Aftertaste", "Acidity", "Body", "Balance"],
        datasets: [
            {
                label: "Gesha",
                data: [8.5, 8.5, 7.92, 8.0, 7.92, 8.25],
                fill:true,
                backgroundColor: "rgba(34, 202, 236, .2)",
                borderColor: "rgba(34, 202, 236, 1)",
                pointBackgroundColor: "rgba(34, 202, 236, 1)",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "rgba(34, 202, 236, 1)"
            }
        ]
    };
    const RadarOptions = {
        scale: {
            ticks: {
                min: 6,
                max: 10,
                stepSize: 1,
                showLabelBackdrop: true,
                backdropColor: "rgba(203, 197, 11, 1)"
            },
            angleLines: {
                color: "#fff",
                lineWidth: 2
            },
            gridLines: {
                color: "#fff",
                circular: true
            }
        }
    };

    return (
        <Radar data={RadarData} options={RadarOptions} />
    );
}

