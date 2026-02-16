import { EyeClosedIcon, EyeIcon } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { forwardRef, useState } from 'react';

const PasswordInput = forwardRef(
  ({ placeholder = 'Digite sua senha', ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
      <div className="relative">
        <Input
          placeholder={placeholder}
          type={showPassword ? 'text' : 'password'}
          ref={ref}
          {...props}
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
  }
);

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
