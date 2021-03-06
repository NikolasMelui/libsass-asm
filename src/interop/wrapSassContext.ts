import { cwrapSignature } from 'emscripten-wasm-loader';

/**
 * Creates cwrapped interface for context api.
 *
 * https://github.com/sass/libsass/blob/master/docs/api-context.md
 */
const wrapSassContext = (cwrap: cwrapSignature) => ({
  //struct Sass_Options* sass_make_options (void);
  make_options: cwrap<() => number>(`sass_make_options`, 'number'),

  //struct Sass_File_Context* sass_make_file_context (const char* input_path);
  make_file_context: cwrap<(inputPath: number) => number>(`sass_make_file_context`, 'number', ['number']),
  //struct Sass_Data_Context* sass_make_data_context (char* source_string);
  make_data_context: cwrap<(inputPath: number) => number>(`sass_make_data_context`, 'number', ['number']),

  //int sass_compile_file_context (struct Sass_File_Context* ctx);
  compile_file_context: cwrap<(sassFileContextptr: number) => number>(`sass_compile_file_context`, 'number', [
    'number'
  ]),
  //int sass_compile_data_context (struct Sass_Data_Context* ctx);
  compile_data_context: cwrap<(sassFileContextptr: number) => number>(`sass_compile_data_context`, 'number', [
    'number'
  ]),

  //struct Sass_Compiler* sass_make_file_compiler (struct Sass_File_Context* file_ctx);
  make_file_compiler: null,
  //struct Sass_Compiler* sass_make_data_compiler (struct Sass_Data_Context* data_ctx);
  make_data_compiler: null,

  //int sass_compiler_parse (struct Sass_Compiler* compiler);
  compiler_parse: null,
  //int sass_compiler_execute (struct Sass_Compiler* compiler);
  compiler_execute: null,

  //void sass_delete_compiler (struct Sass_Compiler* compiler);
  delete_compiler: null,
  //void sass_delete_options(struct Sass_Options* options);
  delete_options: cwrap<(sassOptionsPtr: number) => void>(`sass_delete_options`, null, ['number']),

  //void sass_delete_file_context (struct Sass_File_Context* ctx);
  delete_file_context: cwrap<(sassFileContextptr: number) => void>(`sass_delete_file_context`, null, ['number']),
  //void sass_delete_data_context (struct Sass_Data_Context* ctx);
  delete_data_context: cwrap<(sassFileContextptr: number) => void>(`sass_delete_data_context`, null, ['number']),

  //struct Sass_Context* sass_file_context_get_context (struct Sass_File_Context* file_ctx);
  file_context_get_context: cwrap<(sassFileCtxPtr: number) => number>(`sass_file_context_get_context`, 'number', [
    'number'
  ]),
  //struct Sass_Context* sass_data_context_get_context (struct Sass_Data_Context* data_ctx);
  data_context_get_context: cwrap<(sassFileCtxPtr: number) => number>(`sass_data_context_get_context`, 'number', [
    'number'
  ]),

  //struct Sass_Options* sass_context_get_options (struct Sass_Context* ctx);
  context_get_options: null,
  //struct Sass_Options* sass_file_context_get_options (struct Sass_File_Context* file_ctx);
  file_context_get_options: cwrap<(sassFileCtxPtr: number) => number>(`sass_file_context_get_options`, 'number', [
    'number'
  ]),
  //struct Sass_Options* sass_data_context_get_options (struct Sass_Data_Context* data_ctx);
  data_context_get_options: cwrap<(sassFileCtxPtr: number) => number>(`sass_data_context_get_options`, 'number', [
    'number'
  ]),
  //void sass_file_context_set_options (struct Sass_File_Context* file_ctx, struct Sass_Options* opt);
  file_context_set_options: cwrap<(sassFileCtxPtr: number, sassOptionsPtr: number) => void>(
    `sass_file_context_set_options`,
    null,
    ['number', 'number']
  ),
  //void sass_data_context_set_options (struct Sass_Data_Context* data_ctx, struct Sass_Options* opt);
  data_context_set_options: cwrap<(sassFileCtxPtr: number, sassOptionsPtr: number) => void>(
    `sass_data_context_set_options`,
    null,
    ['number', 'number']
  ),

  //const char* sass_context_get_output_string (struct Sass_Context* ctx);
  context_get_output_string: cwrap<(sassContextPtr: number) => number>(`sass_context_get_output_string`, 'number', [
    'number'
  ]),
  //int sass_context_get_error_status (struct Sass_Context* ctx);
  context_get_error_status: cwrap<(sassContextPtr: number) => number>(`sass_context_get_error_status`, 'number', [
    'number'
  ]),
  //const char* sass_context_get_error_json (struct Sass_Context* ctx);
  context_get_error_json: cwrap<(sassContextPtr: number) => number>(`sass_context_get_error_json`, 'number', [
    'number'
  ]),
  //const char* sass_context_get_error_text (struct Sass_Context* ctx);
  context_get_error_text: cwrap<(sassContextPtr: number) => number>(`sass_context_get_error_text`, 'number', [
    'number'
  ]),
  //const char* sass_context_get_error_message (struct Sass_Context* ctx);
  context_get_error_message: cwrap<(sassContextPtr: number) => number>(`sass_context_get_error_message`, 'number', [
    'number'
  ]),
  //const char* sass_context_get_error_file (struct Sass_Context* ctx);
  context_get_error_file: null,
  //size_t sass_context_get_error_line (struct Sass_Context* ctx);
  context_get_error_line: null,
  //size_t sass_context_get_error_column (struct Sass_Context* ctx);
  context_get_error_column: null,
  //const char* sass_context_get_source_map_string (struct Sass_Context* ctx);
  context_get_source_map_string: cwrap<(sassContextPtr: number) => number>(
    `sass_context_get_source_map_string`,
    'number',
    ['number']
  ),
  //char** sass_context_get_included_files (struct Sass_Context* ctx);
  context_get_included_files: null,

  //size_t sass_compiler_get_import_stack_size(struct Sass_Compiler * compiler);
  compiler_get_import_stack_size: null,
  //Sass_Import_Entry sass_compiler_get_last_import(struct Sass_Compiler * compiler);
  compiler_get_last_import: null,
  //Sass_Import_Entry sass_compiler_get_import_entry(struct Sass_Compiler * compiler, size_t idx);
  compiler_get_import_entry: null,

  //size_t sass_compiler_get_callee_stack_size(struct Sass_Compiler * compiler);
  compiler_get_callee_stack_size: null,
  //Sass_Callee_Entry sass_compiler_get_last_callee(struct Sass_Compiler * compiler);
  compiler_get_last_callee: null,
  //Sass_Callee_Entry sass_compiler_get_callee_entry(struct Sass_Compiler * compiler, size_t idx);
  compiler_get_callee_entry: null,

  //char* sass_context_take_error_json (struct Sass_Context* ctx);
  context_take_error_json: null,
  //char* sass_context_take_error_text (struct Sass_Context* ctx);
  context_take_error_text: null,
  //char* sass_context_take_error_message (struct Sass_Context* ctx);
  context_take_error_message: null,
  //char* sass_context_take_error_file (struct Sass_Context* ctx);
  context_take_error_file: null,
  //char* sass_context_take_output_string (struct Sass_Context* ctx);
  context_take_output_string: null,
  //char* sass_context_take_source_map_string (struct Sass_Context* ctx);
  context_take_source_map_string: null
});

export { wrapSassContext };
