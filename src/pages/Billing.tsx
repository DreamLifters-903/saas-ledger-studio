import { useState, useRef } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Receipt, Plus, Search, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface BillItem {
  slNo: number;
  itemName: string;
  quantity: number;
  amount: number;
}

interface MenuItem {
  name: string;
  price: number;
}

const menuItems: MenuItem[] = [
  { name: "Tea", price: 15 },
  { name: "Coffee", price: 25 },
  { name: "Green Tea", price: 20 },
  { name: "Cold Coffee", price: 40 },
  { name: "Snacks", price: 30 },
  { name: "Samosa", price: 20 },
  { name: "Sandwich", price: 50 },
  { name: "Burger", price: 60 },
  { name: "Pizza Slice", price: 80 },
  { name: "Juice", price: 35 },
];

function generateOrderNumber(): string {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 100).toString().padStart(2, '0');
  return `ORD-${timestamp}${random}`;
}

function getCurrentDate(): string {
  return new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export default function Billing() {
  const [orderNumber] = useState(generateOrderNumber);
  const [billItems, setBillItems] = useState<BillItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [quantity, setQuantity] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const quantityInputRef = useRef<HTMLInputElement>(null);

  const totalAmount = billItems.reduce((sum, item) => sum + item.amount, 0);

  const handleAddItem = () => {
    if (!selectedItem || !quantity || parseInt(quantity) <= 0) return;

    const qty = parseInt(quantity);
    const newItem: BillItem = {
      slNo: billItems.length + 1,
      itemName: selectedItem.name,
      quantity: qty,
      amount: selectedItem.price * qty,
    };

    setBillItems([...billItems, newItem]);
    setSelectedItem(null);
    setQuantity("");
    setSearchValue("");
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-primary/15 shadow-glow-sm">
            <Receipt className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Billing</h1>
            <p className="text-muted-foreground text-sm">Create and manage bills</p>
          </div>
        </div>

        {/* Order Info Card */}
        <Card className="bg-card border-border/50 shadow-card">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Order Number</p>
                  <p className="text-lg font-semibold text-foreground">{orderNumber}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Date</p>
                <p className="text-lg font-semibold text-foreground">{getCurrentDate()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Add Item Section */}
        <Card className="bg-card border-border/50 shadow-card">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Plus className="w-5 h-5 text-primary" />
              Add Item
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Item Search */}
              <div className="flex-1">
                <Label className="text-sm text-muted-foreground mb-2 block">Search Item</Label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-full justify-between bg-background border-border/50 hover:bg-muted/50"
                    >
                      {selectedItem ? (
                        <span className="flex items-center justify-between w-full">
                          <span>{selectedItem.name}</span>
                          <span className="text-muted-foreground">₹{selectedItem.price}</span>
                        </span>
                      ) : (
                        <span className="text-muted-foreground flex items-center gap-2">
                          <Search className="w-4 h-4" />
                          Search items...
                        </span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0 bg-popover border-border" align="start">
                    <Command className="bg-transparent">
                      <CommandInput
                        placeholder="Search items..."
                        value={searchValue}
                        onValueChange={setSearchValue}
                        className="border-none focus:ring-0"
                      />
                      <CommandList>
                        <CommandEmpty>No items found.</CommandEmpty>
                        <CommandGroup>
                          {menuItems.map((item) => (
                            <CommandItem
                              key={item.name}
                              value={item.name}
                              onSelect={() => {
                                setSelectedItem(item);
                                setOpen(false);
                                setTimeout(() => quantityInputRef.current?.focus(), 0);
                              }}
                              className="flex items-center justify-between cursor-pointer"
                            >
                              <span>{item.name}</span>
                              <span className="text-muted-foreground">₹{item.price}</span>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Quantity Input */}
              <div className="w-full sm:w-32">
                <Label className="text-sm text-muted-foreground mb-2 block">Quantity</Label>
                <Input
                  ref={quantityInputRef}
                  type="number"
                  min="1"
                  placeholder="Qty"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="bg-background border-border/50"
                />
              </div>

              {/* Add Button */}
              <div className="flex items-end">
                <Button
                  onClick={handleAddItem}
                  disabled={!selectedItem || !quantity || parseInt(quantity) <= 0}
                  className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow-sm"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bill Table */}
        <Card className="bg-card border-border/50 shadow-card">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Bill Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-border/50 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30 hover:bg-muted/30 border-border/50">
                    <TableHead className="text-primary font-semibold w-20">Sl No</TableHead>
                    <TableHead className="text-primary font-semibold">Item Name</TableHead>
                    <TableHead className="text-primary font-semibold text-center w-28">Quantity</TableHead>
                    <TableHead className="text-primary font-semibold text-right w-32">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {billItems.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-12">
                        <div className="flex flex-col items-center gap-2 text-muted-foreground">
                          <Receipt className="w-10 h-10 opacity-30" />
                          <p>No items added yet</p>
                          <p className="text-sm">Search and add items to create a bill</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    billItems.map((item, index) => (
                      <TableRow
                        key={item.slNo}
                        className={cn(
                          "border-border/30 transition-colors hover:bg-muted/20",
                          index % 2 === 0 ? "bg-background" : "bg-muted/10"
                        )}
                      >
                        <TableCell className="font-medium">{item.slNo}</TableCell>
                        <TableCell>{item.itemName}</TableCell>
                        <TableCell className="text-center">{item.quantity}</TableCell>
                        <TableCell className="text-right font-semibold">₹{item.amount.toFixed(2)}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Total Section */}
        <Card className="bg-card border-border/50 shadow-card">
          <CardContent className="py-6">
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium text-muted-foreground">Total Amount</span>
              <span className="text-3xl font-bold text-primary">
                {billItems.length > 0 ? `₹${totalAmount.toFixed(2)}` : "—"}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
