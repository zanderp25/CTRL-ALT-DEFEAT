import { useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { Button } from '../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Home() {
  const [cac, setCac] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage('');

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cac }),
    });

    if (response.ok) {
      // Handle successful login
      const data = await response.json();
      Cookies.set('session', data.token, { expires: 1 / 96 }); // Set a cookie with the token for 15 minutes
      router.push('/dashboard'); // Redirect to the dashboard
    } else {
      const data = await response.json();
      setErrorMessage(data.message);
    }
  };

  return (
    <>
      <div className="relative">
        <img src="/hero.png" alt="Hero Image" style={{ width: '100%', height: 'auto' }} />
        <div className="absolute inset-0 flex flex-col justify-center items-center space-y-6">
          <h1 className="text-white text-8xl font-bold" style={{ fontFamily: 'Geist Mono, serif' }}>
            ArthroTrack
          </h1>
          <h2 className="text-white text-3xl font-semibold" style={{ fontFamily: 'Geist Mono, serif' }}>
            Leading innovation with patient safety
          </h2>
        </div>
      </div>
      <div className="relative h-80 top-4">
        <img src="/hiking.jpg" alt="Hiking Image" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 flex justify-center items-center">
          <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className='scale-150'>Log In</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Log In</DialogTitle>
            <DialogDescription>
          Insert your CAC to log in.
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleLogin}>
            <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="cac" className="text-right">
              CAC
            </Label>
            <Input
              id="cac"
              type="password"
              placeholder="Insert your CAC"
              className="col-span-3"
              value={cac}
              onChange={(e) => setCac(e.target.value)}
            />
          </div>
            </div>
            <DialogFooter>
          <Button type="submit">Log In</Button>
            </DialogFooter>
          </form>
        </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  );
}