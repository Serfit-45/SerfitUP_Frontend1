
type LogoProps = {
    className?: string;
};

export default function Logo({ className = "w-40 md:w-48 h-auto" }: LogoProps) {
    return (
        <div>
            <img className={className} src="/Logo.svg" alt="Logotipo SerfitUp" />
        </div>
    );
}

