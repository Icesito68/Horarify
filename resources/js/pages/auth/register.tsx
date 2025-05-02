import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

type RegisterForm = {
    name: string;
    apellidos: string;
    DNI: string;
    email: string;
    telefono: string;
    password: string;
    password_confirmation: string;
};

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        name: '',
        apellidos: '',
        DNI: '',
        email: '',
        telefono: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthLayout title="Create an account" description="Enter your details below to create your account">
            <Head title="Register" />
            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            type="text"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            disabled={processing}
                            placeholder="Full name"
                            maxLength={50}
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="apellidos">Surname</Label>
                        <Input
                            id="apellidos"
                            type="text"
                            required
                            tabIndex={2}
                            autoComplete="family-name"
                            value={data.apellidos}
                            onChange={(e) => setData('apellidos', e.target.value)}
                            disabled={processing}
                            placeholder="Surname(s)"
                            maxLength={75}
                        />
                        <InputError message={errors.apellidos} className="mt-2" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="DNI">DNI</Label>
                        <Input
                            id="DNI"
                            type="text"
                            required
                            tabIndex={3}
                            value={data.DNI}
                            onChange={(e) => setData('DNI', e.target.value.toUpperCase())}
                            disabled={processing}
                            placeholder="DNI (e.g., 12345678A)"
                            maxLength={9}
                            pattern="\d{8}[A-Z]"
                            title="DNI must be 8 digits followed by a letter (e.g., 12345678A)"
                        />
                        <InputError message={errors.DNI} className="mt-2" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="telefono">Phone number</Label>
                        <Input
                            id="telefono"
                            type="tel"
                            required
                            tabIndex={4}
                            autoComplete="tel"
                            value={data.telefono}
                            onChange={(e) => setData('telefono', e.target.value)}
                            disabled={processing}
                            placeholder="Phone number"
                            maxLength={9}
                            pattern="\d{9}"
                            title="Phone number must be exactly 9 digits"
                        />
                        <InputError message={errors.telefono} className="mt-2" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email">Email address</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            tabIndex={5}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value.toLowerCase())}
                            disabled={processing}
                            placeholder="email@example.com"
                            maxLength={255}
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            required
                            tabIndex={6}
                            autoComplete="new-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            disabled={processing}
                            placeholder="Password"
                            minLength={8}
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password_confirmation">Confirm password</Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            required
                            tabIndex={7}
                            autoComplete="new-password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            disabled={processing}
                            placeholder="Confirm password"
                            minLength={8}
                        />
                        <InputError message={errors.password_confirmation} />
                    </div>

                    <Button type="submit" className="mt-2 w-full" tabIndex={8} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Create account
                    </Button>
                </div>

                <div className="text-muted-foreground text-center text-sm">
                    Already have an account?{' '}
                    <TextLink href={route('login')} tabIndex={9}>
                        Log in
                    </TextLink>
                </div>
            </form>
        </AuthLayout>
    );
}
