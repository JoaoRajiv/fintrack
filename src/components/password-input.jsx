import { EyeClosedIcon, EyeIcon } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useState } from 'react';

const PasswordInput = ({ placeholder = 'Senha' }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative">
      <Input
        placeholder={placeholder}
        type={showPassword ? 'text' : 'password'}
      />
      <Button
        variant="ghost"
        className="absolute bottom-0 right-0 top-0 my-auto mr-1 h-8 w-8 rounded-full p-0 text-muted-foreground"
        onClick={() => setShowPassword((prev) => !prev)}
      >
        {showPassword ? <EyeClosedIcon /> : <EyeIcon />}
      </Button>
    </div>
  );
};

export default PasswordInput;
