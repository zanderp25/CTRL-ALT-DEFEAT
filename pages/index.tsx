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
  return (
    <>
      <div className="relative">
        <img src="/hero.png" alt="Hero Image" style={{ width: '100%', height: 'auto' }} />
        <h1 className="absolute inset-0 flex justify-center items-center text-white text-4xl font-bold">
          ArthroTrack
        </h1>
      </div>
      <div className="flex space-x-4 justify-center items-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Log In</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Log In</DialogTitle>
              <DialogDescription>
                Enter your credentials to log in.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input id="email" type="email" placeholder="you@example.com" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password" className="text-right">
                  Password
                </Label>
                <Input id="password" type="password" placeholder="••••••••" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Log In</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}