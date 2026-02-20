import { Card, CardContent } from './ui/card';
import logo from '@/assets/images/logo.svg';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import { useAuthContext } from '@/context/auth';
import { ChevronDownIcon, LogOutIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export default function Header({}) {
  const { user, signOut } = useAuthContext();
  return (
    <Card>
      <CardContent className="flex items-center justify-between px-8 py-4">
        <div>
          <img src={logo} alt="FinTrack Logo" />
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="space-x-1">
                <Avatar className="h-8 w-8 rounded">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>
                    <p>
                      {user?.firstName?.charAt(0)}
                      {user?.lastName?.charAt(0)}
                    </p>
                  </AvatarFallback>
                </Avatar>
                <p className="text-sm">
                  {user?.firstName} {user?.lastName}
                </p>
                <ChevronDownIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Meu perfil</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Button
                  className="w-full justify-start"
                  variant="ghost"
                  onClick={signOut}
                  size="small"
                >
                  Sair
                  <LogOutIcon />
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
}
