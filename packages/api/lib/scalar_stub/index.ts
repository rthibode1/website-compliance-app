// packages/api/lib/scalar_stub/index.ts

export const Scalar = (_opts?: any) => {
    return () =>
      new Response("Scalar docs disabled in this build", {
        status: 200,
      });
  };
  