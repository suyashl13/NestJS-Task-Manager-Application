import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { Observable, map } from "rxjs";

type ClassConstructor = new (...args: any[]) => {};
  
export function Serialize(dto: ClassConstructor) {
    return UseInterceptors(new SerializerInterceptor(dto));
}

class SerializerInterceptor implements NestInterceptor {

    constructor(private dto: ClassConstructor) {}

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(
            map((data) => {
                return plainToInstance(this.dto, data, {
                    excludeExtraneousValues: true
                });
            })
        );
    }
}