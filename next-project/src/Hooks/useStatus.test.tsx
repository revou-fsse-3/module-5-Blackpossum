import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import useStatus from './useStatus';


describe('useStatus hooks test',()=>{
    it('should show Logged in',()=>{
        const hook = renderHook(()=> useStatus({status:"aproved"}));
        expect(hook.result.current.statusLabel).toBe("Loged In")
    })
    it("should show not logged in",()=>{
        const hook = renderHook(()=>useStatus({status:"rejected"}));
        expect(hook.result.current.statusLabel).toBe("user Not Logged In")
    })
})