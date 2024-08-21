'use client'
import React, { useEffect,useRef } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, } from "chart.js";
import { Doughnut } from "react-chartjs-2";

export interface props{
  housingValue: number,
  foodValue: number,
  savingsValue: number,
  transportationValue: number,
  entertainmentValue: number,
  otherValue: number
}

export default function CurrentBudgetGraph(props: props) {    

    //Register controllers and items
    ChartJS.register(ArcElement, Tooltip, Legend,);

    let data = [
        {
          label: "Housing",
          value: props.housingValue,
          color: "rgba(142, 202, 230)",
          cutout: "50%",
        },
        {
          label: "Food",
          value: props.foodValue,
          color: "rgba(33, 158, 188)",
          cutout: "50%",
        },
        {
          label: "Savings",
          value: props.savingsValue,
          color: "rgba(2, 48, 71)",
          cutout: "50%",
        },
        {
          label: "Transportation",
          value: props.transportationValue,
          color: "rgba(255, 183, 3)",
          cutout: "50%",
        },
        {
          label: "Entertainment",
          value: props.entertainmentValue,
          color: "rgba(255, 183, 3)",
          cutout: "50%",
        },
        {
          label: "Other",
          value: props.otherValue,
          color: "rgba(251, 133, 0)",
          cutout: "50%",
        },
      ];

      const options: any = {
        plugins: {
          responsive: true,
          doughnutLabel: {
            display: true,
            labels: ['Center Label']
          }
        },
        maintainAspectRatio: false ,
        
        cutout: data.map((item) => item.cutout),
      };

      const finalData = {
        labels: data.map((item) => item.label),
        datasets: [
          {
            data: data.map((item) => Math.round(item.value)),
            backgroundColor: data.map((item) => item.color),
            borderColor: data.map((item) => item.color),
            borderWidth: 1,
            dataVisibility: new Array(data.length).fill(true),
          },
        ],
      };


  return (
    <div className="h-[100%]">
        <Doughnut data={finalData} options={options} />
    </div>
  )
}
