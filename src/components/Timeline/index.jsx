import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function Timeline() {
const steps = [
  {
    date: "01/01/2025",
    title: "Project Kickoff",
    desc: "Started planning Souqna, defined core features like product listings, cart, and checkout flow.",
  },
  {
    date: "15/01/2025",
    title: "Authentication Module",
    desc: "Implemented user registration, login with JWT, and secure authentication flow.",
  },
  {
    date: "01/02/2025",
    title: "Product Management",
    desc: "Integrated product API and built dynamic UI for listing, filtering, and searching products.",
  },
  {
    date: "15/02/2025",
    title: "Shopping Cart & Checkout",
    desc: "Developed add-to-cart logic with Redux, price calculation, and persistent storage using localStorage.",
  },
  {
    date: "01/03/2025",
    title: "Launch & Feedback",
    desc: "Deployed MVP, gathered user feedback, and planned performance and UX improvements.",
  },
];


  // Helper to assign different colors
  const getDotColor = (index) => {
    const colors = ["bg-orange-500", "bg-yellow-400", "bg-blue-600"];
    return colors[index % colors.length];
  };

  return (
    <ol className="my-40 relative space-y-12 before:absolute before:top-0 before:left-1/2 before:h-full before:w-1 before:-translate-x-1/2 before:bg-blue-200 before:rounded">
      {steps.map((step, i) => {
        const [ref, inView] = useInView({
          triggerOnce: true,
          threshold: 0.2,
        });

        return (
          <motion.li
            key={i}
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            className="group relative grid grid-cols-2 odd:-me-3 even:-ms-3"
          >
            <div className="relative flex items-start gap-4 group-odd:flex-row-reverse group-odd:text-right group-even:order-last">
              {/* Dot */}
              <span
                className={`z-10 mt-1.5 size-4 shrink-0 rounded-full ${getDotColor(
                  i
                )} border-4 border-white shadow-md transition group-hover:scale-110`}
              ></span>

              <div className="-mt-1.5">
                <time className="text-sm font-semibold text-blue-600">
                  {step.date}
                </time>
                <h3 className="text-xl font-bold text-gray-900">
                  {step.title}
                </h3>
                <p className="mt-1 text-sm text-gray-600">{step.desc}</p>
              </div>
            </div>

            <div aria-hidden="true"></div>
          </motion.li>
        );
      })}
    </ol>
  );
}
