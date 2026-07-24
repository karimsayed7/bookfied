'use client';

import React, { useCallback, useRef } from 'react';
import { useController, FieldValues } from 'react-hook-form';
import { X } from 'lucide-react';
import { FileUploadFieldProps } from '@/types';
import { cn } from '@/lib/utils';
import { Field, FieldError, FieldLabel } from './ui/field';
import { error } from 'console';
// import { FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';


const FileUploader = <T extends FieldValues>({
    control,
    name,
    label,
    acceptTypes,
    disabled,
    icon: Icon,
    placeholder,
    hint,
}: FileUploadFieldProps<T>) => {
    const {
        field: { onChange, value },
    } = useController({ name, control });

    const inputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (file) {
                onChange(file);
            }
        },
        [onChange]
    );

    const onRemove = useCallback(
        (e: React.MouseEvent) => {
            e.stopPropagation();
            onChange(null);
            if (inputRef.current) {
                inputRef.current.value = '';
            }
        },
        [onChange]
    );

    const isUploaded = !!value;

    return (
        <Field className="w-full">
            <FieldLabel className="text-base">
                {label}
            </FieldLabel>

            <div
                className={cn(
                "upload-dropzone border-2 border-dashed border-[#8B7355]/20",
                isUploaded && "upload-dropzone-uploaded"
                )}
                onClick={() => !disabled && inputRef.current?.click()}
            >
                <input
                ref={inputRef}
                type="file"
                accept={acceptTypes.join(",")}
                className="hidden"
                onChange={handleFileChange}
                disabled={disabled}
                />

                {isUploaded ? (
                <div className="relative flex w-full flex-col items-center px-4">
                    <p className="upload-dropzone-text line-clamp-1">
                    {(value as File).name}
                    </p>

                    <button
                    type="button"
                    onClick={onRemove}
                    className="upload-dropzone-remove mt-2"
                    >
                    <X className="h-5 w-5" />
                    </button>
                </div>
                ) : (
                <>
                    <Icon size={26} className='mb-3' />

                    <p className="upload-dropzone-text">
                    {placeholder}
                    </p>

                    <p className="upload-dropzone-hint">
                    {hint}
                    </p>
                </>
                )}
            </div>
            
        </Field>
    );
};

export default FileUploader;