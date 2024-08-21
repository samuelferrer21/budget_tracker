'use client'
import React, { useEffect,useRef } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

export interface props{
  housing: number,
  food: number,
  savings: number,
  transportation: number,
  entertainment: number,
  other: number,
}

export default function PropsedBudgetGraph(props: props) {    
    //Register controllers and items
    ChartJS.register(ArcElement, Tooltip, Legend);

    let data = [
        {
          label: "Housing",
          value: props.housing,
          color: "rgba(38, 70, 83)",
          cutout: "50%",
        },
        {
          label: "Food",
          value: props.food,
          color: "rgba(42, 157, 143)",
          cutout: "50%",
        },
        {
          label: "Savings",
          value: props.savings,
          color: "rgba(138, 177, 125)",
          cutout: "50%",
        },
        {
          label: "Savings",
          value: props.transportation,
          color: "rgba(233, 196, 106)",
          cutout: "50%",
        },
        {
          label: "Entertainment",
          value: props.entertainment,
          color: "rgba(244, 162, 97)",
          cutout: "50%",
        },
        {
          label: "Other",
          value: props.other,
          color: "rgba(231, 111, 81)",
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
    <div className='h-[100%]'>
        <Doughnut data={finalData} options={options} />
    </div>
  )
}
