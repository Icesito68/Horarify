import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
  } from '@/components/ui/dialog';
  import { Input } from '@/components/ui/input';
  import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
  } from '@/components/ui/select';
  import { Button } from '@/components/ui/button';
  import { useState, useEffect } from 'react';
  import { Empleado } from '@/types'; // Asegúrate de importar tu tipo
  
  type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    data: any;
    onChange: (key: string, value: string | boolean) => void;
    onSave: () => void;
    empleadoId: number | null;
    empleados: Empleado[];
    setEmpleados: React.Dispatch<React.SetStateAction<Empleado[]>>;
  };  
  
  export default function DialogEditEmpleado({
    open,
    onOpenChange,
    data,
    onChange,
    onSave,
  }: Props) {
    const [isRotativo, setIsRotativo] = useState(data.Rotativo);
  
    useEffect(() => {
      setIsRotativo(data.Rotativo);
    }, [data]);
  
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="bg-card p-6 max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="mb-4">Editar Empleado</DialogTitle>
          </DialogHeader>
  
          <div className="space-y-4">
            <InputField label="DNI" value={data.DNI} onChange={val => onChange('DNI', val)} />
            <InputField label="Nombre" value={data.Nombre} onChange={val => onChange('Nombre', val)} />
            <InputField label="Apellidos" value={data.Apellidos} onChange={val => onChange('Apellidos', val)} />
            <InputField label="Email" value={data.Email} onChange={val => onChange('Email', val)} />
            <InputField label="Teléfono" value={data.Telefono} onChange={val => onChange('Telefono', val)} />
  
            <div>
              <label className="block mb-1">Día libre</label>
              <Select value={data.Dia_Libre} onValueChange={(val) => onChange('Dia_Libre', val)}>
                <SelectTrigger><SelectValue placeholder="Selecciona un día" /></SelectTrigger>
                <SelectContent>
                  {['Lunes','Martes','Miercoles','Jueves','Viernes','Sabado','Domingo'].map(d => (
                    <SelectItem key={d} value={d}>{d}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
  
            <BooleanSelect
              label="¿Empleado especial?"
              value={data.Especial}
              onChange={(val) => onChange('Especial', val)}
            />
            <BooleanSelect
              label="¿Turno rotativo?"
              value={data.Rotativo}
              onChange={(val) => {
                setIsRotativo(val);
                onChange('Rotativo', val);
              }}
            />
  
            {isRotativo && (
              <InputField
                label="Turno rotativo (HH:MM - HH:MM)"
                value={data.Turno_Rotativo}
                onChange={val => onChange('Turno_Rotativo', val)}
              />
            )}
  
            <InputField
              label="Turno (HH:MM - HH:MM)"
              value={data.Turno}
              onChange={val => onChange('Turno', val)}
            />
  
            <Button onClick={onSave} className="mt-4 w-full">Guardar cambios</Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
  
  function InputField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
    return (
      <div>
        <label className="block mb-1">{label}</label>
        <Input value={value} onChange={(e) => onChange(e.target.value)} />
      </div>
    );
  }
  
  function BooleanSelect({
    label,
    value,
    onChange,
  }: {
    label: string;
    value: boolean;
    onChange: (val: boolean) => void;
  }) {
    return (
      <div>
        <label className="block mb-1">{label}</label>
        <Select onValueChange={(val) => onChange(val === 'si')} value={value ? 'si' : 'no'}>
          <SelectTrigger>
            <SelectValue placeholder="Sí o No" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="si">Sí</SelectItem>
            <SelectItem value="no">No</SelectItem>
          </SelectContent>
        </Select>
      </div>
    );
  }