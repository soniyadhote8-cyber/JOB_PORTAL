import React from 'react';

const TermsOfService = () => {
    return (
        <div className="max-w-4xl mx-auto my-10 p-8 bg-white border border-gray-200 rounded-xl shadow-md text-gray-800 font-sans leading-relaxed">
            <h1 className="text-3xl font-bold mb-6 text-gray-900 border-b border-gray-200 pb-3">Terms and Conditions</h1>
            
            <h2 className="text-xl font-bold mt-8 mb-3 text-gray-900">1. Introduction</h2>
            <p className="text-gray-600 mb-4">
                Welcome to <span className="font-semibold text-gray-900">[Your Website Name]</span>. These Terms and Conditions govern your use of our website located at <span className="font-semibold text-blue-600">[Your Website URL]</span>. By accessing or using our website, you agree to comply with these terms.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-3 text-gray-900">2. Acceptance of Terms</h2>
            <p className="text-gray-600 mb-4">
                By using our website, you confirm that you accept these Terms and Conditions and that you agree to comply with them. If you do not agree with any part of these terms, you must not use our website.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-3 text-gray-900">3. Changes to Terms</h2>
            <p className="text-gray-600 mb-4">
                We reserve the right to modify or replace these terms at any time at our sole discretion. We will notify you of any changes by updating the date at the top of this page or by posting notice on our website.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-3 text-gray-900">4. Intellectual Property</h2>
            <p className="text-gray-600 mb-4">
                The content, organization, graphics, design, and other matters related to our website are protected under applicable copyrights and trademarks. You may not copy, redistribute, or use any part of the site without our express written permission.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-3 text-gray-900">5. Limitation of Liability</h2>
            <p className="text-gray-600 mb-4">
                In no event shall <span className="font-semibold text-gray-900">[Your Website Name]</span>, nor its directors, employees, or partners, be liable for any indirect, incidental, special, or consequential damages arising out of your use of the website or services.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-3 text-gray-900">6. Termination</h2>
            <p className="text-gray-600 mb-4">
                We may terminate or suspend your access to our website and services immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever, including without limitation if you breach the Terms.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-3 text-gray-900">7. Contact Us</h2>
            <p className="text-gray-600">
                If you have any questions about these Terms of Service, please contact us at <span className="font-semibold text-blue-600">[your email address]</span>.
            </p>
        </div>
    );
};

export default TermsOfService;