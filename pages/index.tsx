import type { NextPage } from 'next';
import React from 'react';

const Home: NextPage = () => {
    return (
        <div className="flex flex-col min-h-full justify-between">
            <main className="md:flex gap-8 px-4 md:px-8 py-4 md:py-10 relative">
               <div className="text-center">
                    <h1>Please see more info on Salsa Therapy's <a href="https://www.salsatherapy.co.nz/">main site</a></h1>
               </div>
            </main>
        </div>
    );
};

export default Home;
