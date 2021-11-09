import firebaseui from "firebaseui";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import { Footer } from "../components/Footer";
import {
  BeakerIcon,
  CalendarIcon,
  LocationMarkerIcon,
  UserGroupIcon,
} from "@heroicons/react/outline";

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Salsa Therapy</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="font-inter antialiased bg-gray-100 text-gray-600">
        <header className="shadow-sm sticky py-6 px-4 flex justify-between items-center top-0 left-0 right-0 bg-white border-b border-gray-200">
          <h1 className="text-5xl font-bold text-purple-900">
            Salsa Therapy 💃
          </h1>

          <nav className="flex gap-6">
            <div>
              <a href="/schedule" className="border-b-4 pb-1">
                Upcoming Classes
              </a>
            </div>
            <div>
              <a href="/pricing">Pricing</a>
            </div>
          </nav>
        </header>

        <div className="flex flex-col min-h-full justify-between">
          <main className="flex gap-8 p-8">
            <div className="border border-gray-300 bg-white flex-1 rounded-md self-start overflow-hidden">
              <div className="p-4 font-bold border-b bg-purple-100">Today</div>
              <div className="p-4 grid grid-cols-3 border-b bg-yellow-100 hover:bg-yellow-50">
                <div className="w-24">7:30am</div>
                <div>Tone</div>
                <div className="text-right">
                  <div className="inline-block text-xs font-semibold text-white py-1 px-2 bg-green-500 rounded-full">
                    Booked
                  </div>
                </div>
              </div>
              <div className="p-4 grid grid-cols-3 border-b cursor-pointer hover:bg-yellow-50">
                <div>7:30am</div>
                <div>Tone</div>
                <div className="text-right"></div>
              </div>

              <div className="p-4 font-bold border-b bg-purple-100">
                Tomorrow
              </div>
              <div className="p-4 grid grid-cols-3 border-b">
                <div className="w-24">7:30am</div>
                <div>Tone</div>
                <div className="text-right">
                  <div className="inline-block text-xs font-semibold text-white py-1 px-2 bg-yellow-500 rounded-full">
                    Waitlisted
                  </div>
                </div>
              </div>
              <div className="p-4 grid grid-cols-3 border-b">
                <div>7:30am</div>
                <div>Tone</div>
                <div className="text-right"></div>
              </div>

              <div className="p-4 font-bold border-b bg-purple-100">
                This week
              </div>
              <div className="p-4 grid grid-cols-3 border-b">
                <div>7:30am</div>
                <div>Tone</div>
                <div className="text-right"></div>
              </div>
              <div className="p-4 grid grid-cols-3 border-b">
                <div>7:30am</div>
                <div>Tone</div>
                <div className="text-right"></div>
              </div>
              <div className="p-4 grid grid-cols-3">
                <div>7:30am</div>
                <div>Tone</div>
                <div className="text-right"></div>
              </div>
            </div>

            <div className="border border-gray-300 bg-white flex-1 rounded-md self-start">
              <h2 className="p-4 font-bold border-b text-2xl">Tone</h2>
              <div className="p-4 text-sm border-b">
                <div className="flex gap-2 items-center">
                  <CalendarIcon className="h-4 w-4" />
                  Thursday, 11 November 2021 7:30am – 8:15am NZDT
                </div>
                <div className="flex gap-2 items-center">
                  <LocationMarkerIcon className="h-4 w-4" />
                  More than Moves, 5B Courtenay Place, Te Aro, Wellington, 6011
                </div>
                <div className="flex gap-2 items-center">
                  <UserGroupIcon className="h-4 w-4" />6 spaces available
                </div>
              </div>
              <div className="p-4 text-sm border-b">
                <h3 className="text-lg font-bold">Details</h3>
                <p>
                  Fun and sweaty class, really focusing on technique and getting
                  the most out of our exercises. We'll be toning our muscles we
                  use most for dancing while grooving to upbeat music!
                </p>
              </div>
              <div className="p-4 text-sm border-b">
                <h3 className="text-lg font-bold">Instructions</h3>
                <p>
                  Bring comfy workout clothes, good gym shoes. Bring a mat for
                  floor work but not mandatory.
                </p>
              </div>
              <div className="p-4 text-sm">
                <h3 className="text-lg font-bold">Tickets</h3>
                <div className="flex justify-between items-end">
                  <div className="text-lg">$15.00</div>
                  <button className="py-3 px-4 rounded-md bg-indigo-500 hover:bg-indigo-600 text-white">
                    Book class
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Home;
