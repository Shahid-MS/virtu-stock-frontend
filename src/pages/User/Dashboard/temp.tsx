// const [selectedAppliedIpo, setSelectedAppliedIpo] =
//   useState<AppliedIPOInterface>();

// const navigate = useNavigate();
// const [isDrawerOpen, setIsDrawerOpen] = useState(false);
// const [isDrawerOpen, setIsDrawerOpen] = useState(false);
// <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
//   {/* Background Blur */}
//   {isDrawerOpen && (
//     <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" />
//   )}

//   {/* Bottom Drawer */}
//   <DrawerContent className="z-50 rounded-t-2xl pb-6 px-6 pt-4 max-w-md mx-auto">
//     <DrawerHeader className="text-center">
//       <DrawerTitle className="text-lg font-semibold">
//         IPO Allotment Status
//       </DrawerTitle>
//     </DrawerHeader>

//     <div className="flex flex-col gap-4 mt-3">
//       <Button
//         className="w-full rounded-xl"
//         onClick={() => {
//           handleAllotment(true);
//         }}
//       >
//         Yes, I Got Allotment
//       </Button>

//       <Button
//         variant="outline"
//         className="w-full rounded-xl"
//         onClick={() => {
//           handleAllotment(false);
//         }}
//       >
//         No, Not Allotted
//       </Button>
//     </div>
//     <DrawerFooter />
//   </DrawerContent>
// </Drawer>;

// const handleAllotment = async (isAlloted: boolean) => {
//   if (!selectedAppliedIpo) return;
//   try {
//     if (isAlloted) {
//       await apiClient.post(`/user/alloted/${selectedAppliedIpo.id}`);
//     }
//   } catch (error) {
//     console.log(error);
//   } finally {
//     navigate(`/user/applied-ipo/${selectedAppliedIpo.id}`);
//     setIsDrawerOpen(false);
//   }
// };

// const handleAppliedIpo = (appliedIpo: AppliedIPOInterface) => {
//   if (!appliedIpo) return;

//   if (
//     appliedIpo.allotment === AllotmentStatus.ALLOTMENT ||
//     appliedIpo.allotment === AllotmentStatus.NOT_ALLOTED
//   ) {
//     setIsDrawerOpen(true);
//     return;
//   }
//   navigate(`/user/applied-ipo/${appliedIpo.id}`);
// };
