import { Suspense } from 'react';
import FormPage from './Components/FormClient';

export default function Page() {
    return (
        <Suspense fallback={<div>Loading form...</div>}>
            <FormPage />
        </Suspense>
    );
}