'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

type VehicleRegistrationData = {
    registrationNumber: string;
    year: string;
    make: string;
    model: string;
    fuelType: string;
    engineCapacity: string;
    color: string;
    wheelplan: string;
};

export default function FormPage() {
    const searchParams = useSearchParams();
    const [isRegistrationLookupLoading, setIsRegistrationLookupLoading] = useState(false);
    const [registrationLookupError, setRegistrationLookupError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState(() => {
        const engineCode = searchParams.get('engineCode') || '';

        return {
            make: searchParams.get('make') || '',
            model: searchParams.get('model') || '',
            year: searchParams.get('year') || '',
            fuelType: searchParams.get('fuelType') || '',
            engineCapacity: searchParams.get('engineCapacity') || engineCode,
            engineCode,
            color: searchParams.get('color') || searchParams.get('colour') || '',
            wheelplan: searchParams.get('wheelplan') || '',
            registrationNumber: searchParams.get('registrationNumber') || '',
            fullName: '',
            phone: '',
            email: '',
            postcode: '',
            remarks: '',
        };
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.currentTarget;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const applyVehicleData = (vehicle: VehicleRegistrationData) => {
        setFormData((prev) => ({
            ...prev,
            registrationNumber: vehicle.registrationNumber || prev.registrationNumber,
            make: vehicle.make || prev.make,
            model: vehicle.model || prev.model,
            year: vehicle.year || prev.year,
            fuelType: vehicle.fuelType || prev.fuelType,
            engineCapacity: vehicle.engineCapacity || prev.engineCapacity,
            color: vehicle.color || prev.color,
            wheelplan: vehicle.wheelplan || prev.wheelplan,
        }));
    };

    const handleRegistrationSearch = async () => {
        const registrationNumber = formData.registrationNumber.trim();

        if (!registrationNumber) {
            setRegistrationLookupError('Please enter your registration number.');
            return;
        }

        setIsRegistrationLookupLoading(true);
        setRegistrationLookupError('');

        try {
            const response = await fetch(`/api/vehicle-registration?registrationNumber=${encodeURIComponent(registrationNumber)}`);
            const payload = (await response.json()) as { vehicle?: VehicleRegistrationData; error?: string };

            if (!response.ok || !payload.vehicle) {
                throw new Error(payload.error || 'We could not find vehicle details for that registration.');
            }

            applyVehicleData(payload.vehicle);
        } catch (error) {
            setRegistrationLookupError(error instanceof Error ? error.message : 'Vehicle lookup failed.');
        } finally {
            setIsRegistrationLookupLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const res = await fetch('/api/send-quote', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (data.success) {
                alert('Quote request sent successfully!');
                
                // ==========================================
                // OPTION 1: Clear the form fields (Recommended)
                // ==========================================
                setFormData({
                    registrationNumber: '',
                    make: '',
                    model: '',
                    year: '',
                    fuelType: '',
                    engineCapacity: '',
                    engineCode: '',
                    color: '',
                    wheelplan: '',
                    fullName: '',
                    phone: '',
                    email: '',
                    postcode: '',
                    remarks: '',
                });

                // ==========================================
                // OPTION 2: Reload the page entirely
                // (Uncomment the line below and remove Option 1 if you prefer a hard reload)
                // ==========================================
                // window.location.reload();
                
            } else {
                alert('Failed to send request.');
            }
        } catch (error) {
            console.error(error);
            alert('Something went wrong.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-8">
            <div className="max-w-3xl mx-auto">
                <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 md:p-8">

                    {/* Title */}
                    <h1
                        className="font-bold text-gray-900 mb-8 border-b pb-4"
                        style={{ fontSize: '1.25rem', lineHeight: '1.25' }}
                    >
                        Confirm Details To Show Price
                    </h1>

                    {/* Responsive Two-Column Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-8">

                        {/* Column 1: Car Details */}
                        <div className="space-y-6">
                            <h2
                                className="font-semibold text-gray-900"
                                style={{ fontSize: '0.95rem', lineHeight: '1.25' }}
                            >
                                Car Details
                            </h2>

                            {/* Registration Number */}
                            <div>
                                <label className="block text-sm font-medium text-gray-900 mb-2">
                                    Registration Number <span className="text-red-500">*</span>
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        name="registrationNumber"
                                        placeholder="e.g. AB12 CDE"
                                        value={formData.registrationNumber}
                                        onChange={(event) => {
                                            const registrationNumber = event.currentTarget.value.toUpperCase();
                                            setRegistrationLookupError('');
                                            setFormData((prev) => ({
                                                ...prev,
                                                registrationNumber,
                                            }));
                                        }}
                                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={handleRegistrationSearch}
                                        disabled={isRegistrationLookupLoading}
                                        className="px-5 py-2 bg-[#15803d] text-white font-semibold rounded-lg hover:bg-green-700 transition whitespace-nowrap"
                                    >
                                        {isRegistrationLookupLoading ? 'SEARCHING...' : 'SEARCH'}
                                    </button>
                                </div>
                                {registrationLookupError ? (
                                    <p className="mt-2 text-sm font-medium text-red-600">{registrationLookupError}</p>
                                ) : null}
                            </div>

                            {/* Make and Model */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-900 mb-2">
                                        Make <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="make"
                                        placeholder="e.g. TOYOTA"
                                        value={formData.make}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-900 mb-2">
                                        Model <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="model"
                                        placeholder="e.g. COROLLA"
                                        value={formData.model}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Fuel Type and Year */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-900 mb-2">
                                        Year <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="year"
                                        placeholder="e.g. 2020"
                                        value={formData.year}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-900 mb-2">
                                        Fuel Type
                                    </label>
                                    <input
                                        type="text"
                                        name="fuelType"
                                        placeholder="e.g. PETROL"
                                        value={formData.fuelType}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            {/* Engine Size and Color */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-900 mb-2">
                                        Engine Size
                                    </label>
                                    <input
                                        type="text"
                                        name="engineCapacity"
                                        placeholder="e.g. 2.0"
                                        value={formData.engineCapacity}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-900 mb-2">
                                        Color
                                    </label>
                                    <input
                                        type="text"
                                        name="color"
                                        placeholder="e.g. RED"
                                        value={formData.color}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    />
                                </div>
                            </div>
                            
                            {/* Engine Code */}
                            <div className="grid grid-cols-1 sm:grid-cols-1 gap-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-900 mb-2">
                                        Engine Title 
                                    </label>
                                    <input
                                        type="text"
                                        name="engineCode"
                                        placeholder="e.g. TOYOTA"
                                        value={formData.engineCode}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Column 2: Customer Details */}
                        <div className="space-y-6">
                            <h2
                                className="font-semibold text-gray-900"
                                style={{ fontSize: '0.95rem', lineHeight: '1.25' }}
                            >
                                Customer Details
                            </h2>

                            {/* Full Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-900 mb-2">
                                    Full Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="fullName"
                                    placeholder="Enter Your Name"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    required
                                />
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-sm font-medium text-gray-900 mb-2">
                                    Phone <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Phone/Mobile Number"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    required
                                />
                            </div>

                            {/* Email & Postcode */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-900 mb-2">
                                        Email <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Your email address"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-900 mb-2">
                                        Postcode <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="postcode"
                                        placeholder="Enter Postcode"
                                        value={formData.postcode}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                            </div>
                            
                            {/* Any Remarks Section */}
                            <div className="mb-8">
                                <label className="block text-sm font-medium text-gray-900 mb-2">
                                    Remarks
                                </label>
                                <textarea
                                    name="remarks"
                                    placeholder="Enter any additional information..."
                                    value={formData.remarks}
                                    onChange={handleChange}
                                    rows={4}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                ></textarea>
                            </div>
                        </div>

                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 px-6 bg-[#15803d] text-white text-lg font-bold rounded-lg hover:bg-green-700 transition uppercase tracking-wide shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'SENDING...' : 'SEND ME PRICE QUOTE'}
                    </button>
                </form>
            </div>
        </div>
    );
}