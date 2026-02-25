import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiMapPin, FiStar } from 'react-icons/fi';

const LandingPage = () => {
    return (
        <div className="landing-page flex-col items-center">
            {/* Hero Section */}
            <section className="hero container text-center py-4 mt-8 flex-col items-center">
                <div className="badge badge-primary mb-6 mx-auto">
                    <FiMapPin /> Barangay Banay-Banay, Cabuyao
                </div>

                <h1 className="font-bold mb-4" style={{ fontSize: 'var(--font-size-3xl)', lineHeight: 1.2 }}>
                    Discover the Best Local Services,<br />
                    <span className="text-primary">Right in Your Neighborhood</span>
                </h1>

                <p className="text-secondary mb-8" style={{ fontSize: 'var(--font-size-lg)', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
                    Connect with trusted micro-enterprises and neighbors in Barangay Banay-Banay.
                    From reliable repairs to delicious home-cooked meals.
                </p>

                <div className="flex gap-4 flex-wrap justify-center mb-12">
                    <Link to="/register?role=resident" className="btn btn-primary" style={{ minWidth: '200px' }}>
                        I'm a Resident <FiArrowRight />
                    </Link>
                    <Link to="/register?role=owner" className="btn btn-secondary" style={{ minWidth: '200px' }}>
                        I'm a Business Owner
                    </Link>
                </div>
            </section>

            {/* Features Section */}
            <section className="features container py-4 mb-12">
                <h2 className="text-center font-bold mb-8 text-primary" style={{ fontSize: 'var(--font-size-2xl)' }}>
                    Why use BarangayConnect?
                </h2>

                <div className="grid gap-6" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>

                    <div className="card text-center flex-col items-center p-4">
                        <div className="btn-icon bg-surface shadow-sm mb-4" style={{ width: '64px', height: '64px', borderRadius: '50%', color: 'var(--primary)', fontSize: '24px' }}>
                            <FiMapPin />
                        </div>
                        <h3 className="font-bold mb-2">Hyperlocal Discovery</h3>
                        <p className="text-muted text-sm">Find stalls and home-based services literally a few streets away from your house.</p>
                    </div>

                    <div className="card text-center flex-col items-center p-4">
                        <div className="btn-icon bg-surface shadow-sm mb-4" style={{ width: '64px', height: '64px', borderRadius: '50%', color: 'var(--secondary)', fontSize: '24px' }}>
                            <FiStar />
                        </div>
                        <h3 className="font-bold mb-2">Trusted by Neighbors</h3>
                        <p className="text-muted text-sm">See verified community businesses and feel safe knowing they are right here in Banay-Banay.</p>
                    </div>

                </div>
            </section>
        </div>
    );
};

export default LandingPage;
