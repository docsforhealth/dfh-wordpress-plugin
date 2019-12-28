import 'lity';

export default function VideoPopup({ className, target, children }) {
  return (
    <a href={target} className={className} data-lity>
      {children}
    </a>
  );
}
