import React from "react";
import Hero from "@/components/main/Hero";
import Skills from "@/components/main/Skills";
import Encryption from "@/components/main/Encryption";
import Projects from "@/components/main/Projects";
import ContactForm from "@/components/main/ContactForm"; // Assuming this is the correct path
//import Footer from "@/components/main/Footer"; // Assuming this is the correct path

export default function Home() {
    return (
        <main className="h-full w-full">
            <div className="flex flex-col gap-20">
                <Hero />
                <Skills />
                <Encryption />
                <Projects />
                <ContactForm />
                
            </div>
        </main>
    );
}