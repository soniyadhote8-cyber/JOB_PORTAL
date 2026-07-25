import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div className="max-w-4xl mx-auto my-10 p-8 bg-white border border-gray-200 rounded-xl shadow-md text-gray-800 font-sans leading-relaxed">
            <h1 className="text-3xl font-bold mb-6 text-gray-900 border-b border-gray-200 pb-3">Privacy Policy</h1>
            
            <p className="text-lg font-semibold text-gray-900 mb-4">Resume/CV</p>

            <h2 className="text-xl font-bold mt-8 mb-3 text-gray-900">Usage Data:</h2>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-600">
                <li>IP address</li>
                <li>Browser type</li>
                <li>Pages visited</li>
                <li>Time spent on pages</li>
            </ul>

            <h2 className="text-xl font-bold mt-8 mb-3 text-gray-900">3. How We Use Your Information</h2>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-600">
                <li>To provide and maintain our services</li>
                <li>To notify you about changes to our services</li>
                <li>To allow you to participate in interactive features</li>
                <li>To provide customer support</li>
                <li>To gather analysis or valuable information so that we can improve our services</li>
                <li>To monitor the usage of our services</li>
                <li>To detect, prevent, and address technical issues</li>
            </ul>

            <h2 className="text-xl font-bold mt-8 mb-3 text-gray-900">4. Data Security</h2>
            <p className="text-gray-600 mb-4">We take the security of your personal information seriously and implement appropriate technical and organizational measures to protect it.</p>

            <h2 className="text-xl font-bold mt-8 mb-3 text-gray-900">5. Sharing Your Information</h2>
            <p className="text-gray-600 mb-3">We do not sell or rent your personal information to third parties. We may share your information with:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-600">
                <li>Service providers who assist us in operating our website</li>
                <li>Law enforcement agencies if required by law</li>
            </ul>

            <h2 className="text-xl font-bold mt-8 mb-3 text-gray-900">6. Your Rights</h2>
            <p className="text-gray-600 mb-3">You have the right to:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-600">
                <li>Access your personal information</li>
                <li>Request correction of your personal information</li>
                <li>Request deletion of your personal information</li>
            </ul>

            <h2 className="text-xl font-bold mt-8 mb-3 text-gray-900">7. Changes to This Privacy Policy</h2>
            <p className="text-gray-600 mb-4">We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>

            <h2 className="text-xl font-bold mt-8 mb-3 text-gray-900">8. Contact Us</h2>
            <p className="text-gray-600">
                If you have any questions about this Privacy Policy, please contact us at <span className="font-semibold text-blue-600">soniyadhote8@gmail.com  </span>.
            </p>
        </div>
    );
};

export default PrivacyPolicy;