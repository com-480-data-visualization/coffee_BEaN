import React from "react";
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);
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
export function RadarChart(props) {
    const data = {
        labels: ["Aroma", "Flavor", "Aftertaste", "Acidity", "Body", "Balance"],
        datasets: [
            {
                label: props.label,
                data: props.data,
                backgroundColor: props.backgroundColor,
                borderColor: props.borderColor,
                borderWidth: 1.5,
            }
        ]
    };
    const options = {
        plugins: {
            legend: {
                labels: {
                    color: props.borderColor,
                    font: {
                        size: 16
                    }
                }
            }
        },
        scales: {
            r: {
                ticks: {
                    display: false,
                    stepSize: 0.2,
                },
                pointLabels: {
                    color: 'rgba(250, 237, 244, 0.8)',
                    font: {
                        size: 14
                    }
                },
                angleLines: {
                    color: 'rgba(250, 237, 244, 0.8)',
                },
                grid: {
                    color: 'rgba(250, 237, 244, 0.8)',
                }
            }

        }
    }

    return (
        <Radar data={data} options={options}/>
    );
}

